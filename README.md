# DnD CS

API and web application for managing 5th edition Dungeons and Dragons characters.

## 1.0 Database

This project uses MongoDB and requires a database running locally. You could also use [Mongo Atlas](https://cloud.mongodb.com), but for convenience when developing a local instance has you covered in case there's any troubles with connecting to the internet in general.

### 1.1 Download Mongo

_The following steps are for macOS_

Download MongoDB in their [download section here](https://www.mongodb.com/download-center).

Once downloaded extract the content of the tgz download. I suggest moving the content to your users folder or some other more permanent directory than Downloads and renaming the directory to `mongodb`.

Next to your `mongodb` directory create a new directory called `mongo-data` which will contain the data for your local databases.

### 1.2 Run mongo

From a new terminal window locate the path to your mongodb directory. Run the executable in the `mongodb` folder and supply the `mongodb-data` as the dbpath argument.

For example if you put it in your Users directory (and your user is called JoeSchmo) you would run this command

```bash
/Users/JoeSchmo/mongodb/bin/mongod --dbpath=/Users/JoeSchmo/mongodb-data
```

If everything went as expected you should look for the local port in the output. It should look like this:

```bash
[initandlisten] waiting for connections on port 27017
```

### 1.3 GUI

If you want to view your local data in a GUI you can use [Robo 3T here](https://robomongo.org/download).

## Development
