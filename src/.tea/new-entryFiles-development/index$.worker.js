
require('./config$.js?appxworker=1');
require('./importScripts$.js?appxworker=1');
function success() {
require('../..//app.js?appxworker=1');
require('../../components/add-button/add-button.js?appxworker=1');
require('../../pages/todos/todos.js?appxworker=1');
require('../../pages/add-todo/add-todo.js?appxworker=1');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
