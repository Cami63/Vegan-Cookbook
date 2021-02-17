from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time

driver = webdriver.Chrome()
driver.get("http://localhost:3000/")

assert "React App" in driver.title

elem = driver.find_element_by_id("Dinner")
elem.click()

search = driver.find_element_by_class_name("search-btn")
search.click()

wait = WebDriverWait(driver, 10)

wait.until(EC.visibility_of_element_located((By.XPATH, "//button[text()='Falafel']")))

falafel = driver.find_element_by_xpath("//button[text()='Falafel']")

falafel.click()

wait.until(EC.visibility_of_element_located((By.ID, "search-result-nationality")))

nationality = driver.find_element_by_id("search-result-nationality")

assert "Middle Eastern" in nationality.text, "Nationality of falafel recipe was not middle eastern"

# time.sleep(10)

driver.close()