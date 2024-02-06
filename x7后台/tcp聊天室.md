```
const net=require('net')
const server=net.createServer()
server.on('connection',clientSocket=>)
server.listen(port,cb)
client.on('data',data=>)
client.write()

// client.js
const client=net.createConnection({host,port})
host:127.0.0.1本机
client.on('connect',cb)
client.on('data',data=>)

```


```
.xml
<bookstore>
	<book category="COOKING">
	  <title lang="en">Everyday Italian</title> 
	  <author>Giada De Laurentiis</author> 
	  <year>2005</year> 
	  <price>30.00</price> 
	</book>
	<book category="CHILDREN">
	  <title lang="en">Harry Potter</title> 
	  <author>J K. Rowling</author> 
	  <year>2005</year> 
	  <price>29.99</price> 
	</book>
	<book category="WEB">
	  <title lang="en">Learning XML</title> 
	  <author>Erik T. Ray</author> 
	  <year>2003</year> 
	  <price>39.95</price> 
	</book>
</bookstore>

.json
{
	"key":["a","b","c"]
}

.yaml
house:
  family:
    name: Doe
    parents:
      - John
      - Jane
    children:
      - Paul
      - Mark
      - Simone
  address:
    number: 34
    street: Main Street
    city: Nowheretown
    zipcode: 12345
	
```