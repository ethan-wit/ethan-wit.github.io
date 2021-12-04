# Hiding Files in Public Repositories
[Homepage](https://ethan-wit.github.io)

---

Guide to store files in your local directory, but hide them in your public repository. I've found this useful for reducing clutter in public repositories, so others have an easier time understanding your project structure.

---

### 1. Create a .gitignore file

- Create a text file and name it .gitignore. Add the items (files/folders) you would like hidden in your public repository; specs can be found [here](https://www.freecodecamp.org/news/gitignore-what-is-it-and-how-to-add-to-repo/).

### 2. Remove files

- git rm -r --cached
- The above command will remove (rm) items recursively (-r) from the staging area (--cached)

### 3. Update public repository

- git add *
- git commit -m "removed files from public repository"
- git push
