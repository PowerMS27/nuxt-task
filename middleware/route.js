export default function (context) {
   if (context.route.path === '/') {
     return context.redirect('/1?filter=all')
   }

 }