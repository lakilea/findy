# Welcome to findy!
to setup project in your local, you need to follow below instructions.

use **npm install** command to install all packages
use **npm run eject** command to get android folder

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

then to enable multidex follow this link [Enabling Multidex](https://rnfirebase.io/enabling-multidex)

to get more details go [React Native Firebase](https://rnfirebase.io/)

then open android studio > open android project [C:\....\findy\android] > Build > Make Project

## Other Settings

add following settings to **android > gradle.properties**

```java
org.gradle.daemon=true
org.gradle.configureondemand=true
org.gradle.jvmargs=-Xmx4g -XX:MaxPermSize=2048m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
```

add following settings to **android > app > build.gradle**

```java
android {
    dexOptions {
       javaMaxHeapSize "3g"
    }
}
```

## Expo Settings

add following settings to **AndroidManifest.xml**

```xml
<manifest ... >
  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```

## Release Settings

go android > app > buld.gradle and increase 

```java
versionCode 1
versionName "1.0.0"
```

then run following command

```java
./gradlew bundleRelease
```