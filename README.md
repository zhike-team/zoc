# Zoc

Zoc is a shortcut for using oc(Openshift CLI) logs/rsh commands

# Features

1. Combine multiple pods logs in one log stream.
2. Pods selectable and/or searchable.
3. Support .zocrc, it can be put into project root directory or HOME directory.

# Usage

```
npm i -g zoc
zoc rsh [KEYWORD]
zoc logs [KEYWORD]
```

# .zocrc options

* defaultKeyword, if no keyword provided, this one would be used.
* username, your Openshift account username.
* password, if you mind, you can leave it empty or don't use it.
* host, the Openshift server host.

```
{
      "defaultKeyword": "mypod",
      "username": "myname",
      "password": "mypass",
      "host": "myhost"
}
```

# LICENSE

MIT
