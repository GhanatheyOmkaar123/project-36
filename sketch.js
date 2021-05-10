//Create variables here
var dog,database,foodS,foodStock;
var dogIMG,happyDogIMG;
var feed,addFood;
var feedTime,lastFed;
var foodObj;

function preload(){
	//load images here
  dogIMG=loadImage("images/dogImg.png");
  happyDogIMG=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 1000);
  database=firebase.database()
  dog = createSprite(250,250,100,100);
  dog.addImage(dogIMG);
  dog.scale=0.08;

  foodObj = new Food(150,150,50,50)

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousepressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousepressed(addFoods);
  
}


function draw() {  
background(46,139,87);


  //add styles here
  textSize(15);
  fill("blue");
  stroke(5)
text("Food remaining :"+foodS,200,200);
text("Press UP_ARROW Key To Feed Drago Milk!",130,20);

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed + "AM",350,30);
}

drawSprites();
foodObj.display();
}

function feedDog(){
  dog.addImage(happyDogIMG);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
   if(x<=0) { 
    x=0;
    }else {
    x=x-1;
   } 

database.ref('/').update({
   Food:x
   })
   } 



