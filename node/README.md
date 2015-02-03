![mem](http://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Phoenician_mem.svg/85px-Phoenician_mem.svg.png)
===

#mem: command line task manager.
Concept: minimal UI, maximal helpfulness

##Install:
1. Clone this repo: `$ git clone https://github.com/mLuby/mem.git`
2. Cd into the clone: `cd mem/node`
3. Install dependencies: `$ npm install`
4. Configure your bash profile:
    
    ```bash
$ echo "mem() { 
      cd $(pwd); 
      node mem-cli.js '\$@'; 
      cd - > /dev/null; 
}" >> ~/.bash_profile 
    ```
    
5. Restart terminal.
6. Run `$ mem help` to see available commands. 

##Use
Typical use will start with `$ mem add 'my first task'`. From there you can:
- `$ mem list`
- `$ mem get` [task# or 'taskName' or blank will return current task]
- `$ mem tag` ['tagName']
- `$ mem untag` ['tagName']
- `$ mem examine` [property, eg 'tags']

##Contribute
- Open [issues](https://github.com/mLuby/mem/issues), both bugs and feature requests.
- [Pull request](https://github.com/mLuby/mem/pulls) code you've fixed, improved, or added.
