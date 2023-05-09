import sys
import time
from selenium import webdriver
from multiprocessing import Process
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def load_site(url, seconds):
    options = Options()
    options.binary_location = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    driver = webdriver.Chrome(chrome_options = options, executable_path="C:\\Program Files\\Google\\Chrome\\Application\\chromedriver.exe")
    driver.get(url)
    time.sleep(30)
    driver.find_element(By.ID, 'travel-ai-chatinput').send_keys("can you create an itinerary for New Orleans?")
    driver.find_element(By.ID, 'send-button-chat-input').click()
    time.sleep(seconds)  # Adjust the sleep time as needed
    driver.quit()

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python script_name.py <number_of_users> <url> <seconds>")
        sys.exit(1)

    num_users = int(sys.argv[1])
    url = sys.argv[2]
    seconds = int(sys.argv[3])

    processes = []

    for _ in range(num_users):
        p = Process(target=load_site, args=(url, seconds,))
        p.start()
        processes.append(p)

    for p in processes:
        p.join()
