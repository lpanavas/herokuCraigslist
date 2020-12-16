import json as json
jsonFile = open("C:/Users/lpana/Downloads/apartments/apts.json", "r")
print(jsonFile)
json_object = json.load(jsonFile)
jsonFile.close()

# for x in json_object:
#     tmpImages = (x["images"])
#     for tmp in tmpImages:
#         tmp.replace("50x50c", "300x300")
#         print(tmp)


# jsonFile = open("C:/Users/lpana/Downloads/apartments/apts.json", "w+")
# jsonFile.write(json.dumps(json_object))
# jsonFile.close()
