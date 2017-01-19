# ReActivityClient
Front End Code for ReActivity

# Welcome to Reactivity

Reactivity is a mobile application that allows users to create, maintain, join and locate
sporting events. Reactivity supports a wide array of events and uniquely associates these
events with various users. A profile system exists which focuses on the users and their
interactions with one another.


### Development
To connect the exponent client to your nodeJS server, start [ngrok](https://ngrok.com/):
```
./ngrok http 3000
```
Or with your own subdomain:
```
./ngrok http -subdomain=ourowndomain8463 3000
```

Then add your baseUrl to localvars.js in /lib

### Relevant Technologies

There are a few technologies that are important to know in order to effectively use this
code base.

# ngrok

If you are developing on a local machine, you'll want to use ngrok. This allows you to 
make requests to your own machine through local host by creating a tunnel. Using the basic
localhost method does not work correctly with Exponent, so tend to ngrok.

# Exponent

This is the XDE in which we work. Exponent features are largely unused in code, save for 
some asset loading and routing. 

# React-Native

Most all of React Native is available for use inside Exponent. Exponent itself does help fill
certain gaps, meaning it should never be necessary to write Swift/Java. 

# Simulator

This is not a technology you code in, per se, but it's important to note that you should use 
both an Android and iOS simulator. React Native renders things differently on each device and
if you use both simulators you can save yourself from later headaches.

### Hello, Code!

Reactivity's front end consists of a rather large code base. At first glance, the code can 
be somewhat confusing. This section seeks to communicate a broad overview of the code and how
one might navigate through and modify it in a developmentally sound way.

# File Structure

There are currently around 10 top-level folders, but only a few of these are heavily used
in development. A description of these folders follows.

--> .exponent:  This consists of a few JSON files which configure Exponent, the Developer 
                Environment in which this app is created.

--> api:        This consists of a single function which requests device permissions. This
                should not be confused with the 'api' object regularly imported and used.

--> assets:     Fairly straightforward. Currently, this is only used to keep fonts.

--> components: One of the main files; components contains a variety of components. These 
                are *all* used as sub-components. If a component uses the entire screen, it
                is referred to as a 'screen' and will be in the associated folder.

--> constants:  A largely unused folder with various color settings (not used in styling), 
                alert management and layout control. Again, these are largely not directly
                used.

--> lib:        This is a collection of 'helper files'. They are widely used, so the important
                ones will be discussed.

                --> ajaxCalls:  (Nearly) all of our server calls are contained here. The calls
                                generally make use of a 'fetch template'.

                --> loader:     Manages 'preloading'. If you need to load assets before displaying
                                a screen, write the loading function(s) here.

                --> localvars:  If you are developing on your local machine, you'll need to use ngrok.
                                Place your ngrok url here.

                --> reduxStore: Arguably the most important file in this codebase -- the redux store 
                                collects and manages state which various components need access to.
                                This file is busy. While you should *only* have one redux store,
                                reducer functions can be broken out and combined at the end with a 
                                special redux combination function. The default state must also be a
                                single object; but this can be iteratively generated for easier
                                reading of code.

--> navigation: The two files here manage the page-to-page routing. 

--> node_mod.:  Node modules.

--> screens:    These are all of the components which render as entire mobile pages. They make use of 
                sub-components, but they should never be subcomponents themselves. You should be able
                to route to all screens.

--> utilities:  This is unused. In the future, testing suites would be placed and utilized here.


### Golden Rules

There are only a few 'Golden Rules' which should be followed when contributing to or modifying this code
base. They are as follows:

1. Use only one redux store. 

    You can have multiple reducer functions, but maintain only one store. This is a redux best practice and
    it saves headaches later. A redux store is essentially an object and it has no size limit. If readability
    is an issue, refactor so that you construct the default state object with objects created elsewhere. The
    default state, and thus the store state, should only consist of one 'object' when the reducer is initialized,
    however.

2. But newly created components in the right folder.

    If it is a 'sub-component', which means that its parent is a screen, put it in the component's folder. If it
    is a screen, which means that it has no parent which has an associated view, put it in the screens folder.
    There are simply too many components to have them all in the same folder. Consider breaking apart each
    folder even further for clarity.



### TODO