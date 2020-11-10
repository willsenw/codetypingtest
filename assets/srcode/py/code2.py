class mc:
    def __init__(self, fname, lname):
        self.fname = fname
        self.lname = lname

    def hello(self):
        return self.fname + " " + self.lname

class st(mc):
    def __init__(self, fname, lname):
        super().__init__(fname,lname)

p = st("sari", "risa")
print(p.hello())

c = mc("lemi","mile")
print(c.hello())
