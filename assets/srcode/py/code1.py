people = ["Ko","Jo","Wi"]
nation = ["sg", "idn"]

for ab in people:
    print(ab)
    for cd in nation :
        print(cd + " " + ab)

abr = ["Jo", "Ko", "Wi"]
for i in range(3):
    for j in range(i,3):
        if people[j] == abr[i] :
            temp = people[j]
            people[j] = people[i]
            people[i] = temp
            break

print(abr[0] + abr[1] + abr[2])
