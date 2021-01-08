# Welcome to findy!
to setup project in your local, you need to follow below instructions.

## firebase setup
go **android > build.gradle**

```java
buildscript {
	ext {
		...
		googlePlayServicesAuthVersion = "18.0.0"
	}
	repositories {
		...
		google()
	}
	dependencies {
		...
		classpath 'com.google.gms:google-services:4.3.3'
	}
}
```
go **android > app> build.gradle**

```json
apply plugin: "com.google.gms.google-services"
```
to get more details go [React Native Firebase](https://rnfirebase.io/)