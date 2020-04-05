#include "DHT.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <SPI.h>

#define DHTPIN 2

#define DHTTYPE DHT11

DHT dht(DHTPIN,DHTTYPE);


float humidityData;
float temperatureData;


const char* ssid = "ACT";// 
const char* password = "8056563551";
//WiFiClient client;
char server[] = "192.168.0.104";   //eg: 192.168.0.222


WiFiClient client;    


void setup()
{
 Serial.begin(9600);
  delay(10);
  dht.begin();
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password); //connect to wifi router
 //wait for connection
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  ////If connection successful show IP address in serial monitor 
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  //server.begin();
  Serial.println("Server started");
  Serial.print(WiFi.localIP());
  delay(1000);
  Serial.println("connecting...");
 }
void loop()
{ 
  humidityData = dht.readHumidity();
  temperatureData = dht.readTemperature(); 
  Sending_To_phpmyadmindatabase(); 
  delay(30000); // interval
 }

 void Sending_To_phpmyadmindatabase()   //CONNECTING WITH MYSQL
 {
   if (client.connect(server, 80)) {
    Serial.println("connected");
    // Make a HTTP request:
    Serial.print("GET /dht11/dht11.php?humidity=");
    client.print("GET /dht11/dht11.php?humidity=");     //YOUR URL
    Serial.println(humidityData);
    client.print(humidityData);
    client.print("&temperature=");
    Serial.println("&temperature=");
    client.print(temperatureData);
    Serial.println(temperatureData);
    client.print(" ");      //SPACE BEFORE HTTP/1.1
    client.print("HTTP/1.1");
    client.println();
    client.println("Host: Your Local IP");
    client.println("Connection: close");
    client.println();
  } else {
    // if you didn't get a connection to the server:
    Serial.println("connection failed");
  }
 }
