---
title: "Making Mac and Windows Keyboard Layouts Compatible"
date: 2025-04-05 10:12:00 +0200
categories: 
  - Customization
tags: 
  - keyboard
  - macos
  - windows
  - scripting
excerpt: "Solving keyboard layout inconsistencies between Mac and Windows machines for better productivity."
toc_sticky: true
---

I suddenly faced a problem of inconsistent keyboard layouts between my work Mac and home Windows laptops. It is practically impossible to work effectively and maintain blind typing skills when you're forced to switch physical and logical keyboards twice a day. When I can’t use an external keyboard - due to space constraints at my desk or while traveling - I had to come up with a compromise solution: remapping keys and shortcuts on both machines for better compatibility.

<!--more-->

---

## Prerequisites

- Classic Windows keyboard  
- MacBook M1 Pro keyboard  
- Two keyboard layouts used equally: English and Russian  
- Extensive work with code and console environments  

---

## Goal

As a long-term Windows and Linux user, I was very accustomed to traditional PC-style keyboards. However, the Mac keyboard turned out to be surprisingly convenient - even after decades of using something else. So, my goal was to mimic the Mac keyboard layout in Windows 11 as closely as possible, with minimal remapping on the Mac side. Ideally, the list of remappings in Windows should be as short as possible, reusing existing keys and shortcuts wherever appropriate.

---

## Remappings Map

### On Mac

- **Fn ↔ Ctrl**  
  While the `Ctrl` key is less commonly used on macOS (many functions are handled by the `Command` key), it’s still important in some apps - especially those not fully adapted to Mac. Swapping `Fn` and `Ctrl` places them where they are on a standard Windows keyboard.

- **Caps Lock → Esc**  
  Does anyone still use Caps Lock? I personally don’t. If you're using Vim keybindings in your editor, having an extra `Esc` key here is perfect.

---

### On Windows

- **Win → Alt**  
  This moves the `Alt` key one position left - like it is on a Mac keyboard.

- **Alt → Ctrl**  
  This mimics the `Command` key on Mac. Common operations like copy-paste, select-all, undo, etc., differ only by this key.

- **Caps Lock → Esc**  
  Same reasoning as on Mac.

- **Right Ctrl → Win**  
  While the `Win` key is sometimes considered a `Command` alternative, it's more limited in Windows and rarely used by third-party apps. Still, since it’s needed for native shortcuts, keeping it to the right of the spacebar is essential. I wanted a better solution here, but hit some technical limitations - more on that below.

---

## Shortcuts

Windows is surprisingly restrictive when it comes to remapping system shortcuts. While macOS offers a generous set of options right in system settings, Windows makes it difficult at nearly every step. For example, when changing the keyboard layout, you can choose only from three predefined shortcuts (`Shift+Ctrl`, `` ` ``, or `Shift+Alt`). Custom shortcuts aren’t supported. So, we need external tools - and even then, the combination of remapped keys and custom shortcuts often fails in subtle ways.

### Custom Mappings

- **Win+Space → Ctrl+Space**  
  This remaps the layout switcher shortcut. The Mac equivalent is `Cmd+Space`. Since we've moved `Ctrl` left of the spacebar, `Ctrl+Space` makes sense.

- **Ctrl+Tab → Alt+Tab**  
  On macOS, `Ctrl+Tab` shows running applications. This maps it to Windows' `Alt+Tab`.

- **Alt+Space → Open Command Palette**  
  This launches the [Command Palette](https://learn.microsoft.com/en-us/windows/powertoys/run/) (PowerToys Run), equivalent to macOS Spotlight. You can also try third-party launchers like [Wox](https://github.com/Wox-launcher/Wox) or [Keypirinha](https://keypirinha.com/).

---

## Non-English Layout Support

If you’re using a non-English layout (like Russian), you'll also want consistency in symbol positioning.

Here's how I remapped keys in Russian layout to match Mac behavior:

```text
Shift+5 → :
Shift+6 → ,
Shift+7 → .
Shift+8 → ;
```

---

## Implementation

We’ll need two tools for Windows 11:

- [Microsoft PowerToys](https://learn.microsoft.com/en-us/windows/powertoys/)
- [AutoHotKey](https://www.autohotkey.com/)

PowerToys is great for simple key remapping. The interface is user-friendly - you can apply remappings manually. But remember: **shortcut remappings are applied *after* key remappings!**

When you need more complex behavior (like layout-sensitive remaps), use AutoHotKey. It allows scripting virtually any input behavior.

You can read the full [AutoHotKey documentation here](https://www.autohotkey.com/docs/AutoHotkey.htm).

Here’s the script I use to detect Russian layout and remap symbols accordingly:

```ahk
; Function to check if the current keyboard layout is Russian.
IsRussian() {
    WinGet, activeID, ID, A
    threadID := DllCall("GetWindowThreadProcessId", "UInt", activeID, "UInt", 0)
    hkl := DllCall("GetKeyboardLayout", "UInt", threadID)
    return (hkl & 0xFFFF) = 0x0419  ; 0x0419 = Russian
}

#If IsRussian()
+5::Send, {:}
+6::Send, {,}
+7::Send, {.}
+8::Send, {;}
/::Send, {/}
?::Send, {?}
#If
```

This script was built collaboratively by me and Claude Sonnet over several iterations. You can adjust it by:

- Replacing `0x0419` with your language ID  
- Using the appropriate modifiers:
  - `+` → Shift
  - `^` → Ctrl
  - `!` → Alt

Example of a more complex remap:

```ahk
LCtrl & Space::
    SendInput {Shift down}{LCtrl down}
    Sleep 50
    SendInput {LCtrl up}{Shift up}
Return
```

To test and debug your mappings, use **Key History**:  
> Right-click AHK icon in tray → "Open" → Press `Ctrl+K`.

Once your script is ready, place it in your autostart folder:

1. Press `Win+R`
2. Type `shell:startup`
3. Place or symlink your script in the folder that opens

Done!

---

## Limitations

- Circular remappings (e.g. `Alt → Ctrl` and `Ctrl+Tab → Alt+Tab`) are tricky in AutoHotKey. I gave up and used PowerToys instead - you might have better luck.
- System keys like `Alt`, `Ctrl`, and `Win` can’t be freely reassigned due to Windows limitations. For example, mapping `Alt+Ctrl` to `Win` is not allowed.
- The `Fn` key doesn’t send a scannable keycode and can’t be intercepted. So remapping `Fn+Ctrl` to act as `Win` isn’t feasible on most machines.

---

## Backing Up Your Config

Once everything is working, back it up!

### PowerToys

1. Open PowerToys → Settings → **Backup**
2. Save the backup to `Documents\PowerToys\Backup`

You can upload both your PowerToys backup and your AutoHotKey script to:

- [GitHub Gist](https://gist.github.com/)
- Google Docs
- Any cloud storage you prefer
