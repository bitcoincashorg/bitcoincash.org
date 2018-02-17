# Metadata

Title:            Automatic Replay Protection
Workgroup:        hardforks
Meeting Time:     20180202 1100 (UTC)
Document Version: 1.0

Developer Participants:
 * Amaury Sechét of Bitcoin ABC
 * Shammah Chancellor of Bitcoin ABC
 * Josh Yabut
 * Dan Connolly
 * JVP

REQUEST TO EDITORS:

This document is intended to be updated to act as a reference for the topic at hand.  However, due to the nature of this also reflecting the discussion of a meeting which occurred at a particular point in time, any additional information or clarification should be clearly marked as an editor's note "e.n." 

# Problem Statement

In order to ensure smooth protocol upgrades in the future, it is desirable to ensure that all transactions post-upgrade are replay protected.  This protects users funds in the event that a minority fork is maintained, and becomes valuable.

# Possible Solutions

## Change SigHash ForkID in New Code

Increment the `forkId` of each protocol upgrade going forward.

Positives:
* Explicit and easy to understand.

Negatives:
* Requires a significant amount of industry coordination, as all wallets now are required to participate in software upgrades that may otherwise have not affected them.

## Automatically Change SigHash ForkID in Old Code

Automatically increment the `forkId` of un-upgraded nodes at the date of the next protocol upgrade. 

Positives:
* Allows wallets to follow the protocol upgrade without modification provided no change significantly alters how SPV wallets function.
* Forces software upgrades on a routine schedule which is set well in advance.

Negatives:
* Forces software upgrades on a routine schedule which is set well in advance.

## Do nothing

Do not provide replay protection for future Bitcoin Cash hardforks.

Positives:
* No work required

Negatives:
* Does not replay protect potential minority forks.

# Resolution

No resolution was obtained.  Solution (2) does not require agreement between teams.
