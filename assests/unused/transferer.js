/*
** VALUE TRANSFERER
**
** transferSender(value) SAVES THE GIVEN VALUE TO THE 
** "host.transferObject" VARIABLE
**
** transferReciever() GETS THE VALUE SAVED IN THE 
** "host.transferObject" AND MAKE "host.transferObject" undefined
*/
function transferSender(value) {
    // creates and saved the value
    host.transferObject = value;
};
function transferReciever() {
    // get the saved value use, then delete it
    let obj = host.transferObject;
    host.transferObject = undefined;
    return obj;

};
// END