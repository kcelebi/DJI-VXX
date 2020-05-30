def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█', printEnd = "\r"):
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    print('\r%s |%s| %s%% %s' % (prefix, bar, percent, suffix), end = printEnd)
    if iteration == total: 
        print()
# just a progress bar method, makes stuff easier        
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import time

head_dict = {} #dictionary to contain

for y in range(2000,2021): # iterate through years
	for m in range(1,13): #iterate through months
		for d in range(1,32): #iterate through days

			url="";
			if m < 10 and d < 10: #come up w appropriate url according to conditions
				url = "https://www.wsj.com/news/archive/" + str(y) + str(0) + str(m) + str(0) + str(d)
			elif m < 10 and d >= 10:
				url = "https://www.wsj.com/news/archive/" + str(y) + str(0) + str(m) + str(d)
			elif m >=10 and d < 10:
				url = "https://www.wsj.com/news/archive/" + str(y) + str(m) + str(0) + str(d)
			else :
				url = "https://www.wsj.com/news/archive/" + str(y) + str(m) + str(d)

			driver = webdriver.Chrome('/Users/kayacelebi/chromedriver') 
			driver.get(url) #get link
			time.sleep(2)
			  
			page = driver.page_source
			driver.quit()
			soup = BeautifulSoup(page, 'html.parser')

			container = soup.find_all('article') #find the articles

			date = url.split('/')[-1] #get the date we're using
			if date not in head_dict: #create dict entry
				head_dict[date] = []

			for c in container: #get the headline
			    for link in c.findAll('a'):
			        head_dict[date].append(link.getText())
			head_dict[date] = list(dict.fromkeys(head_dict[date]))
			#just progress bar stuff again
			printProgressBar(d,len(range(1,32)), prefix = 'Day ' + str(d), suffix = 'Complete', length = 50)
		printProgressBar(m,len(range(1,13)), prefix = 'Month ' + str(m), suffix = 'Complete', length = 50)
	printProgressBar(y,len(range(2000,2021)), prefix = 'Year ' + str(y), suffix = 'Complete', length = 50)

#throw it into json
json = json.dumps(head_dict)
f = open('dict.json','w')
f.write(json)
f.close()

