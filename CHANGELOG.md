Scratch.js

**2018-11-08 08:22**

###### v0.2	added _popup_ function, using style.css as modif-able class
Sample usage: 
```javascript
	var msg='hello';				
	var objButton={
		cancel	:function(){popup_close()},
		ok		:function(){savetask(parent_id,rowIdx)}
	};
	popup_alert(msg,objButton);
```
Functions: 
*	popup_alert(msg,object_button), 
*	popup_button(array_button_as_callback_function), 
*	popup_close()
###### v0.2	added "ls" as localStorage object
