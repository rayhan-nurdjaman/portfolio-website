# Rolling Over Speed Bumps: Building a Backdrivable 20:1 Cycloidal Actuator

I wanted to actually understand how precision robotic gearboxes work instead of just buying one, so I designed and 3D printed a 20:1 cycloidal drive from scratch, worked out how to get FDM parts to stop binding, and drove it with an STM32 BlackPill and a TMC2209 stepper driver.

## Why cycloidal

I mainly chose to design and build a cycloidal drive purely to learn how they work. I mostly understood how planetary and harmonic drives worked, but cycloidal drives were still foreign to me. I wanted to know how the reduction happens and how the ring gears are designed mathematically.

Before designing it, I knew I wanted the drive to fit a NEMA 17 stepper. My original plan was to use metal dowel pins for the ring gear, since they'd be more dimensionally accurate, have less friction against PLA+, and hold up to wear a lot better than anything I could print. The smallest pin I could find was 2mm, and once I worked backward from that, 20:1 at a 40mm pitch circle came out as a nice round number that just barely fit in the smallest footprint I could squeeze onto a NEMA 17.

## The math

I started in Desmos to check the geometry before touching CAD, tuning eccentricity \(e\), pitch radius \(R\), and roller radius \(R_r\) until the profile didn't undercut or self-intersect.

The disc contour:

x(\theta) = (R cos theta - e cos(N\theta)) - R_r \cos(\theta + \psi)

$$y(\theta) = (-R \sin\theta + e \sin(N\theta)) + R_r \sin(\theta + \psi)$$

where \(\psi\) is the contact normal angle from the instantaneous eccentricity vector:

$$\psi = \arctan\left(\frac{\sin((N-1)\theta)}{\frac{R}{e N} - \cos((N-1)\theta)}\right)$$

I brought this into SolidWorks as an equation-driven curve and added about 0.1mm of offset to account for FDM expansion and pin clearance.

![Desmos and SolidWorks Curve](/screenshots/cycloid-actuator/equation-sketch.jpg)

### Two discs, 180° apart

I knew that only having 1 disk would make the drive unbalanced, and looking at references online showed that a majority of cycloidal drives had 2 disks 180 degree out of phase to each other. I ended up implementing the same principle in my design to avoid any unbalance.

### Metal dowels didn't work

My original plan, to use metal dowel pins in the ring gear, didn't work. The dowels themselves were fine, the problem was the holes I printed for them. Since I printed the bores for the dowels vertically, layer shifts during 3D printing ended up tilting and misaligning the pins invisible to the naked eye. This made the drive have inconsistent tolerances, causing it to bind and be too loose at certain points in its rotation.

Too alleviate the issue and reduce complexity in the number of parts needed, I decided to ditch the dowels completely and 3D print the ring gear's teeth.

### Designing for manufacturing

## Electronics and firmware

Controller's an STM32F401 BlackPill, driving both motors off TIM2 and TIM3 in PWM mode, with a plain GPIO pin per motor doing direction.

I don't have real encoders on this yet, so position tracking is basically me trusting the timer. Every time a PWM pulse finishes, I check whichever DIR pin belongs to that motor and bump a running counter up or down:

```
void HAL_TIM_PWM_PulseFinishedCallback(TIM_HandleTypeDef *htim) {
  if (htim->Instance == TIM2 && htim->Channel == HAL_TIM_ACTIVE_CHANNEL_1) {
    if (HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_1) == GPIO_PIN_SET) {
      current_position[0]++;
    } else {
      current_position[0]--;
    }
  }
  // same idea for TIM3 / motor 1
}
```

It's open-loop in the sense that if the motor stalls or skips a step under load, the firmware has no clue — it just keeps counting like nothing happened. Good enough to close a loop around for now, but it's on the list of things I know I'll regret eventually.

The actual control loop lives on TIM1, firing at a fixed rate. It's a PD controller, though the "D" part isn't a real derivative of error — it's just damping straight off the current RPM, which was easier to reason about while tuning:

```
void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim) {
  if (htim->Instance == TIM1) {
    float dt = 1.0f / refresh_rate;
    for (int i = 0; i < 2; i++) {
      int error = target_position[i] - current_position[i];
      float accel = ((float)error * kp - current_rpm[i] * kd) * dt;
      current_rpm[i] += accel;
      current_rpm[i] = clamp(current_rpm[i], -1000.0f, 1000.0f);
      set_motor_speed(i, current_rpm[i]);
    }
  }
}
```

set_motor_speed() is where the RPM number turns into an actual timer period. I'm assuming a 1MHz timer clock and 1600 pulses per output revolution, so it's just solving for how many microseconds each pulse needs to take:

```
void set_motor_speed(int motor_id, float rpm) {
  float rotation_per_second = fabsf(rpm) / 60.0f;
  float ticks_per_second = rotation_per_second * 1600.0f;

  if (ticks_per_second < 0.1f) return; // dodge a div by zero

  uint32_t new_arr = (uint32_t)(1000000.0f / ticks_per_second);
  if (new_arr > 65535) new_arr = 65535;
  uint32_t new_ccr = new_arr / 2;

  __HAL_TIM_SET_AUTORELOAD(tims[motor_id], new_arr);
  __HAL_TIM_SET_COMPARE(tims[motor_id], TIM_CHANNEL_1, new_ccr);

  HAL_GPIO_WritePin(GPIOA, dir_pins[motor_id],
                     rpm < 0 ? GPIO_PIN_RESET : GPIO_PIN_SET);
}
```

Right now the main loop is nowhere near real usage — it's just nudging both target positions back and forth every 4 seconds and dumping a test buffer out over UART, mostly so I can eyeball the PD response on a scope and make sure nothing's stalling before I trust it with anything closed-loop.

Small thing I only caught while writing this up: set_motor_speed() calls abs() from stdlib.h on a float, which quietly truncates it to an int first. Should've been fabsf() from the start — works by accident right now since the values are big enough that the truncation doesn't matter, but it's exactly the kind of bug that'll bite me later.

## Where it's at now

I'm working through two output configurations:

1. Carrier-driven — outer ring fixed, three output pins drive a faceplate
2. Ring-driven — carrier pins fixed, the ring itself rotates as the output shell

![6-DOF Robotic Arm CAD](/screenshots/cycloid-actuator/arm-cad-assembly.jpg)

The end goal is using this as a repeating module for a 6-DOF arm. Already modeled the full assembly in SolidWorks around these actuator envelopes.

### Next up

- Micro limit switches for zero-homing on boot
- Stall torque and thermal limits under sustained load
- CAN or UART bus to run multiple STM32 nodes together
- Print the first two shoulder joints, test deflection under cantilever load
