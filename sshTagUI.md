Maintenance Automation
Replacing TagUI with Direct SSH
1. Introduction

The Maintenance Automation system is used to execute pre-check, configuration, post-check, and uplink redundancy tests on Juniper devices.

In the current implementation, TagUI is used to connect to devices and execute commands.

This document explains the design to remove TagUI and replace it with Direct SSH using JSch.

This improves system performance, reliability, and scalability.

2. Current Implementation Using TagUI
2.1 Current Flow

For executing commands, the system performs the following steps:

Generate CLI commands dynamically

Convert commands into TagUI scripts

Create working directories

Copy and decrypt credential files

Generate .tag files

Run TagUI as an external process

Connect to devices via SSH

Save output in text files

Parse output

2.2 Current Architecture
Spring Boot
     |
Generate Script
     |
Run TagUI Process
     |
TagUI Engine
     |
SSH
     |
Juniper Device

3. Problems with TagUI-Based Approach
3.1 Heavy Dependency

TagUI requires:

Script files

CSV credential files

Encryption/decryption

OS-specific commands

External runtime

This increases system complexity.

3.2 Slow Execution

Each execution requires:

File creation

Process startup

Script loading

Output parsing

This adds unnecessary delay.

3.3 Limited Control

With TagUI:

Difficult to retry single commands

Hard to stop or resume

Limited error handling

No fine-grained monitoring

3.4 No True Parallel Support

TagUI UI is not multi-session.

As a result:

Limited concurrent execution

Poor scalability

3.5 Difficult Debugging

TagUI errors are often unclear and hard to analyze.

4. Proposed Solution: Direct SSH Using JSch

Instead of using TagUI, the system connects directly to devices using JSch SSH library.

All commands are executed through Java code.

4.1 New Architecture
Spring Boot
     |
SSH Session Pool (JSch)
     |
Juniper Device


No external tools are required.

4.2 New Execution Flow

Open SSH session to device

Authenticate using username and password

Send CLI commands

Read output directly

Handle errors in code

Close session

4.3 Example Flow
Connect → Configure → Commit → Ping → Restore → Commit → Close


All steps are controlled inside the application.

5. Advantages of Direct SSH Over TagUI
5.1 Performance Improvement
Aspect	TagUI	Direct SSH
Startup Time	High	Low
File IO	Yes	No
Process Spawn	Yes	No
Execution Speed	Slow	Fast

Direct SSH is much faster.

5.2 Better Reliability

Direct SSH provides:

Stable connections

Fewer dependencies

Less failure points

This improves system stability.

5.3 Better Error Handling

With Direct SSH, the system can detect:

Authentication failure

Command failure

Commit error

Timeout

And respond immediately.

5.4 Better Retry Control

With Direct SSH:

Retry only failed commands

Retry only failed devices

No need to restart full flow

5.5 Better Security

Direct SSH:

Keeps credentials in memory

Avoids storing passwords in files

Can integrate with secure vaults

This improves security.

5.6 Better Scalability

Direct SSH supports:

Multiple SSH sessions

Thread pools

Parallel execution

Horizontal scaling

6. Impact on Maintenance Automation Flow
6.1 Pre-check / Config / Post-check

The functional flow remains the same.

Only execution method changes.

Old: Spring → TagUI → SSH → Device
New: Spring → SSH → Device

6.2 Uplink Redundancy Test

The command logic remains unchanged:

Disable Interface
Ping Leaf
Enable Interface


Only TagUI is removed.

Commands are executed via SSH.

7. Handling Parallel Execution

Direct SSH enables:

Multiple simultaneous connections

Parallel device execution

Independent sessions

This allows multiple maintenance flows to run at the same time.

8. Integration with Lock and Retry System

Direct SSH works smoothly with:

Device-level locking

Global redundancy locking

Automatic retry mechanism

Because all execution is controlled inside the application.

9. Summary
Why Remove TagUI

✔ Heavy dependency
✔ Slow execution
✔ Difficult debugging
✔ Limited scalability
✔ Hard to control

Why Use Direct SSH

✔ Faster execution
✔ Better stability
✔ Better security
✔ Easy retry handling
✔ Easy monitoring
✔ Enterprise-ready design

Final Conclusion

Replacing TagUI with Direct SSH using JSch simplifies the system architecture, improves performance, and increases reliability.

This approach is suitable for large-scale, production-level Maintenance Automation.
