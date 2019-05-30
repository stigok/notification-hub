First, put this script file in *~/.irssi/scripts/*.
Throughout this example, the notification-hub server is expected to run at
http://10.7.0.1:3005.

Load or autoload this script on irssi startup
```
/script load hilightcmd.pl
/script autoload hilightcmd.pl
```

Set what command to be run on upon highlights inside irssi

```
/set hilightcmd_systemcmd printf "{\"title\":\"IRC\",\"message\":\"%s\"}" %(message)s | curl -Ss 10.7.0.1:3005 -X POST -H 'Content-Type: application/json' -d@-
```

Message yourself to see what happens

```
/msg stigok Hello!
```
