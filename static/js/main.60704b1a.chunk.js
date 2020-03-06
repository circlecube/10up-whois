(this["webpackJsonp10up-whois"]=this["webpackJsonp10up-whois"]||[]).push([[0],{102:function(e,t,a){e.exports=a.p+"static/media/10up-logo.a5fccafa.svg"},179:function(e,t,a){e.exports=a(418)},184:function(e,t,a){},225:function(e,t){},239:function(e,t){},241:function(e,t){},417:function(e,t,a){},418:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),s=a(176),c=a.n(s),o=(a(184),a(21)),i=a.n(o),l=a(43),u=a(66),d=a(12),m=a(13),p=a(15),h=a(14),f=a(16),g=a(65),b=function(e){function t(){var e,a;Object(d.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(n)))).clickCard=function(){a.props.clicked||a.props.onClick(a.props.person,a.props.index,a.props.correct)},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return n.a.createElement("li",{className:"person-card",onClick:this.clickCard,"data-clicked":this.props.clicked,"data-correct":this.props.correct},n.a.createElement("img",{src:this.props.person.image,alt:this.props.person.name}),n.a.createElement("p",{className:"detail"},n.a.createElement("span",{className:"person-name"},this.props.person.name),n.a.createElement("span",{className:"person-title"},this.props.person.title)))}}]),t}(r.Component),v=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return n.a.createElement("div",{className:"score"},n.a.createElement("div",{className:"label average"},this.props.average),n.a.createElement("div",{className:"label total"},this.props.correct+" / "+this.props.total),this.props.record.map((function(e,t){return n.a.createElement("div",{className:"record","data-correct":e,key:t})})))}}]),t}(n.a.Component),E=function(e){function t(){var e,a;Object(d.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(n)))).state={questionID:0,questionIndex:0,questionAnswers:[],correctlyAnswered:[],score:{correct:0,total:0,average:0},record:[],startTime:Date.now(),duration:0,teamName:"",clicked:[!1,!1,!1,!1]},a.startQuiz=function(){a.setState({startTime:Date.now(),teamName:a.props.teamName}),console.log("starting quiz at",a.state.startTime)},a.endQuiz=function(){var e=Date.now();a.setState({duration:e-a.state.startTime});var t={score:a.state.score,teamName:a.state.teamName,duration:a.state.duration,timestamp:e,name:"TEST",avatar:"TEST"};a.props.endCallback(t)},a.makeQuizQuestion=function(){if(a.state.correctlyAnswered.length>=a.props.team.length)a.endQuiz();else{a.setState({clicked:[!1,!1,!1,!1]});var e=a.getUnansweredPerson(a.props.team),t=a.props.team[e].id,r=a.randomPeople(a.props.team,e);a.setState((function(){return{questionID:t,questionIndex:e,questionAnswers:r}}))}},a.getUnansweredPerson=function(e){var t=Math.floor(Math.random()*e.length);return a.state.correctlyAnswered.includes(t)?a.getUnansweredPerson(e):t},a.randomUniqueNumbers=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=a.length;for(t+=r;a.length<t;){for(var n=Math.floor(Math.random()*e);a.includes(n);)n=Math.floor(Math.random()*e);-1===a.indexOf(n)&&a.push(n)}return a},a.randomPeople=function(e,t){if(e){var r=[t],n=[];return r=a.randomUniqueNumbers(e.length,3,r),n.push(e[r[0]]),n.push(e[r[1]]),n.push(e[r[2]]),n.push(e[r[3]]),a.shuffle(n)}},a.shuffle=function(e){for(var t,a,r=e.length;0!==r;)a=Math.floor(Math.random()*r),t=e[r-=1],e[r]=e[a],e[a]=t;return e},a.calculateScore=function(e,t){return Math.floor(e/t*100)},a.handleCardClick=function(e,t,r){var n=Object(u.a)(a.state.clicked);n[t]=!0,a.setState({clicked:n});var s=a.state.score.correct+r,c=a.state.score.total+1,o=a.calculateScore(s,c);a.setState((function(e){return{score:{correct:s,total:c,average:o},record:e.record.concat(r)}})),r&&(a.setState((function(e){return{correctlyAnswered:e.correctlyAnswered.concat(e.questionIndex)}})),setTimeout(function(){this.makeQuizQuestion()}.bind(Object(g.a)(a)),500))},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.startQuiz(),this.makeQuizQuestion()}},{key:"render",value:function(){var e=this;return n.a.createElement(n.a.Fragment,null,n.a.createElement("p",null,this.state.questionAnswers&&"Who is ".concat(this.props.team[this.state.questionIndex].name,"?")),n.a.createElement("ul",{className:"people-list -quiz"},this.state.questionAnswers.map((function(t,a){return n.a.createElement(b,{person:t,key:t.id,index:a,correct:t.id===e.state.questionID,clicked:e.state.clicked[a],onClick:e.handleCardClick})}))),this.state.record.length>0&&n.a.createElement(v,{record:this.state.record,total:this.state.score.total,correct:this.state.score.correct,average:this.state.score.average}))}}]),t}(r.Component),k=function(e){function t(){return Object(d.a)(this,t),Object(p.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){var e=this;return n.a.createElement(n.a.Fragment,null,this.props.records.length>0&&n.a.createElement("table",{className:"leaderboard"},n.a.createElement("thead",{className:"label"},n.a.createElement("tr",{className:"leaderboard-title"},n.a.createElement("th",{colSpan:"4"},this.props.title," for ",this.props.teamName)),n.a.createElement("tr",null,n.a.createElement("th",null),n.a.createElement("th",null,"Name"),n.a.createElement("th",null,"Score"),n.a.createElement("th",null,"Time"))),n.a.createElement("tbody",null,this.props.records.map((function(t,a){return t.teamName===e.props.teamName?n.a.createElement("tr",{key:a},n.a.createElement("td",null,n.a.createElement("img",{src:t.avatar,width:"50",height:"50",alt:t.name})),n.a.createElement("td",null,t.name),n.a.createElement("td",null,t.score.average),n.a.createElement("td",null,parseFloat(t.duration/1e3).toFixed(2),"s")):null})))))}}]),t}(n.a.Component),y=a(177),w=a.n(y),N=a(178),j=a.n(N);function O(){return S.apply(this,arguments)}function S(){return(S=Object(l.a)(i.a.mark((function e(){var t,a,r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.a.get("https://cors-anywhere.herokuapp.com/https://10up.com/about/");case 2:return t=e.sent,e.next=5,j.a.load(t.data);case 5:return a=e.sent,r=[],a("#team .team-member").each((function(e,t){r.push({image:a(t).find(".avatar.photo").attr("data-src"),name:a(t).find(".meta h3").text().replace(/\u00a0/g," "),title:a(t).find(".meta p").text(),group:a(t).attr("class").replace("team-member team-","").replace("team-member ",""),bio:a(t).find(".employee-bio > p").text(),id:e})})),e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var C=a(67),z=a.n(C);z.a.initializeApp({apiKey:"AIzaSyCFNG-pU5Gg76H7ssYPKGSqBo_4aP-56WU",authDomain:"upwhois.firebaseapp.com",databaseURL:"https://upwhois.firebaseio.com",projectId:"upwhois",storageBucket:"upwhois.appspot.com",messagingSenderId:"406850437886",appId:"1:406850437886:web:5d83e5e5089899849e5baf",measurementId:"G-8M7VBFVV1L"}),z.a.analytics();var T=z.a,Q=a(102),A=a.n(Q),x=(a(417),function(e){function t(){var e,a;Object(d.a)(this,t);for(var r=arguments.length,n=new Array(r),s=0;s<r;s++)n[s]=arguments[s];return(a=Object(p.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(n)))).state={isLoading:!0,team:null,groups:[],selectedTeam:null,selectedName:"Anonymous",selectedAvatar:A.a,isQuiz:!1,testing:!0,lastQuiz:null,leaderboard:[],selectedLeaderboard:[],message:"\n<h2>Welcome!</h2>\n<p>Click yourself and then select a group for your quiz.</p>"},a.beginQuiz=function(){a.setState({isQuiz:!0,message:null})},a.cancelQuiz=function(){a.setState({isQuiz:!1})},a.endQuiz=function(e){a.setState({isQuiz:!1,lastQuiz:e}),100===e.score.average&&(e.name=a.state.selectedName,e.avatar=a.state.selectedAvatar,a.addToLeaderboard(e)),a.setState({message:"\n<h2>Congratulations! You finished the quiz!</h2>\n<h3>You scored ".concat(e.score.average,"% (").concat(e.score.correct," of ").concat(e.score.total,") in ").concat(parseFloat(e.duration/1e3).toFixed(2),"s!</h3>\n<p>Try again or try a different quiz! You must score 100% to be added to the leaderboard!</p>")})},a.setGroups=function(e){var t=Object(u.a)(new Set(e.map((function(e){return e.group})))).map((function(t){var a={};return""===t?(a.title="All",a.team=e):(a.title=t,a.team=e.filter((function(e){return e.group===t}))),a}));t.sort((function(e,t){return e.title>t.title?1:t.title>e.title?-1:0})),a.state.testing&&t.push({title:"Test *van",team:e.filter((function(e){return e.name.includes("van")}))}),a.setState({groups:t,selectedTeam:t.find((function(e){return"All"===e.title}))})},a.handleCardClick=function(e,t,r){a.setState({selectedName:e.name,selectedAvatar:e.image})},a.handleTeamChange=function(e){a.setSelectedTeam(e.target.value)},a.setSelectedTeam=function(e){var t=[];a.state.leaderboard.length>0&&(t=a.state.leaderboard.filter((function(t){return t.teamName===e}))),a.setState({selectedTeam:a.state.groups.find((function(t){return t.title===e})),selectedLeaderboard:t})},a.addToLeaderboard=function(e){T.database().ref("leaderboard").push(e);var t=a.state.leaderboard.concat(e);a.setState({leaderboard:t},(function(){a.loadLeaderboard()}))},a}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O();case 2:t=e.sent,this.setGroups(t),this.setState({team:t}),this.loadLeaderboard(),this.setState({isLoading:!1});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"loadLeaderboard",value:function(){var e=Object(l.a)(i.a.mark((function e(){var t=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T.database().ref("leaderboard").orderByChild("duration");case 2:e.sent.on("value",(function(e){var a=e.val(),r=[];(r=Array.isArray(a)?a:Object.keys(a).map((function(e,t){return a[e]}))).sort((function(e,t){return parseInt(e.duration)>parseInt(t.duration)?1:parseInt(t.duration)>parseInt(e.duration)?-1:0})),t.setState({leaderboard:r},(function(){t.setSelectedTeam(t.state.selectedTeam.title)}))}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"app"},n.a.createElement("header",{className:"header"},n.a.createElement("img",{src:A.a,className:"logo",alt:"Who is 10up",onClick:this.cancelQuiz}),n.a.createElement("a",{class:"code-link",href:"https://github.com/circlecube/10up-whois"},n.a.createElement("svg",{class:"octicon octicon-mark-github v-align-middle",height:"32",viewBox:"0 0 16 16",width:"32"},n.a.createElement("path",{"fill-rule":"evenodd",d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"}))),n.a.createElement("div",{title:"Current User",className:"current-user person-card","data-clicked":"true","data-correct":"true"},n.a.createElement("img",{src:this.state.selectedAvatar,alt:this.state.selectedName}),n.a.createElement("p",{className:"detail"},n.a.createElement("span",{className:"person-name"},this.state.selectedName))),this.state.message&&n.a.createElement("div",{className:"message",dangerouslySetInnerHTML:{__html:this.state.message}}),this.state.isLoading&&n.a.createElement("p",null,"Loading..."),this.state.team&&!this.state.isQuiz&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",null,"Who are these people?"),n.a.createElement("ul",{className:"people-list -mini"},this.state.selectedTeam.team.map((function(t){return n.a.createElement(b,{person:t,key:t.id,clicked:t.name===e.state.selectedName,correct:!0,onClick:e.handleCardClick})}))),n.a.createElement("select",{value:this.state.selectedTeam.title,onChange:this.handleTeamChange},this.state.groups.map((function(e){return""!==e&&n.a.createElement("option",{name:e.title,key:e.title},e.title)}))),n.a.createElement("button",{onClick:this.beginQuiz},"Begin Quiz"),this.state.leaderboard&&this.state.leaderboard.length>0&&n.a.createElement(k,{title:"High Scores",records:this.state.selectedLeaderboard,teamName:this.state.selectedTeam.title})),this.state.isQuiz&&n.a.createElement(E,{teamName:this.state.selectedTeam.title,team:this.state.selectedTeam.team,endCallback:this.endQuiz})))}}]),t}(n.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[179,1,2]]]);
//# sourceMappingURL=main.60704b1a.chunk.js.map