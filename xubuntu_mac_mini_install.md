# Installing Xubuntu 20.04 on a Mac mini
[Homepage](https://ethan-wit.github.io)

---

Guide to install Xubuntu 20.04 on a [Mac mini (Late 2014)](https://support.apple.com/kb/sp710?locale=en_US) with 1.4 GHz clock speed and 4 GB of RAM. I decided to install Xubuntu because this machine's processing power is below the [recommended](https://ubuntu.com/download/desktop) >= 2 GHz for Ubuntu 20.04.

---

### 1. Download Xubuntu image

  - The download page can be found [here](https://xubuntu.org/download/#show-all). I downloaded the Desktop version from the Indiana University mirror, found [here](https://ftp.ussg.iu.edu/linux/xubuntu/releases/20.04/release/).

### 2. Acquire a USB Drive

  - I used the [Sandisk Ultra Fit USB 3.1 Flash Drive](https://www.westerndigital.com/products/usb-flash-drives/sandisk-ultra-fit-usb-3-1#SDCZ430-016G-G46); 16 GB should work fine.

### 3. Install [balenaEtcher](https://www.balena.io/etcher/) 

  - This software allows you to create the bootable USB drive, which will install Xubuntu on the Mac mini.

### 4. Create the bootable USB Drive

  - Use balenaEtcher to flash the Xubuntu image to the USB drive.

### 5. Install Xubuntu on the Mac mini

  - Insert the USB drive into the Mac mini. 
  - If you receive the pop-up "The disk you inserted was not readable by this computer", click "Initialize". This will open the "Disk Utility" program, and then you should verify the disk. If the prompt outputs "0", you can proceed.
  - Restart the computer, and immediately after hearing the start-up tone, hold the Option/Alt button on your keyboard. This will open the bootloader.
  - You will have the option to boot Mac OS or EFI. To load Xubuntu, click EFI.
  - Click "Try Xubuntu". This will load Xubuntu, and you can fully install the OS by clicking the "Install Xubuntu" icon on the desktop at any time.

### 6. Connecting to the Internet
  - If your router does not appear under the "Network Manager" icon in the top right of the ribbon, you will need to install its driver.
  - To do so, connect to your router with an Ethernet cable. 
  - Click the top left icon, go to Settings > Additional Drivers. Select "Using <driver>" and then "Apply changes". This will install the driver, and you should then find your router when you select the "Network Manager".
