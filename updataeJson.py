import json as json
jsonFile = open("C:/Users/lpana/Downloads/apartments/aptsPositive.json", "r")
print(jsonFile)
json_object = json.load(jsonFile)
jsonFile.close()


for x in json_object:
    # newImage = ""
    # for tmp in x["result-price"]:
    #     stringA = tmp.replace("50x50c", "300x300")
    stringA = x["result-price"].replace("$", "")
    tmp = stringA.replace(",", "")

    print(tmp)
    x["actualPrice"] = tmp
    # x.update(tmp)


jsonFile = open("C:/Users/lpana/Downloads/apartments/aptsCorrect.json", "w+")
jsonFile.write(json.dumps(json_object))
jsonFile.close()
