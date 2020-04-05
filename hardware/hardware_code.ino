#include "DHT.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <SPI.h>

#define DHTPIN 2

#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

float humidityData;
float temperatureData;

const char *ssid = "ACT"; //
const char *password = "8056563551";
//WiFiClient client;
char server[] = "192.168.0.102"; //eg: 192.168.0.222

client;

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
  sendingDataToBackend();
  delay(30000); // interval
}

void sendingDataToBackend() //CONNECTING WITH MYSQL
{
  DynamicJsonBuffer jb;
  JsonVariant bodyJson = jb.createObject();
  bodyJson["id"] = 1231;
  bodyJson["temperature"] = temperatureData;
  bodyJson["humidity"] = humidityData;
  String bodyString = "";
  bodyJson.printTo(bodyString);
  HTTPClient http;
  http.setConnectTimeout(10000);
  http.begin("http://localhost:3000/roomLevel");
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(bodyString);
  (httpCode > 0 && httpCode == 200)
      ? Serial.print("data send")
      : Serial.print("data send failed");
  http.end();
}
