(this.webpackJsonpemulator=this.webpackJsonpemulator||[]).push([[0],{12:function(G,t,e){G.exports=e(20)},17:function(G,t,e){},20:function(G,t,e){"use strict";e.r(t);var n=e(10),a=e(11),r=e(4),c=e(5),o=e(6),i=e(2),s=e(7),l=e(1),u=e.n(l),h=e(0),g=e.n(h),k=function(G){var t=G.id,e=G.readOnly;return u.a.createElement("div",{className:"as400-container"},u.a.createElement("div",{className:"screen"},u.a.createElement("div",{className:"".concat(t," as400-highlight")}),u.a.createElement("div",{className:"".concat(t," as400-style")}),u.a.createElement("textarea",{readOnly:e||!1,className:"".concat(t," as400-screen")}),u.a.createElement("textarea",{readOnly:e||!1,className:"".concat(t," as400-screen-temp")})))},m=e(8),p=e.n(m),f=function(G,t){for(var e="",n=0;n<G;n+=1){for(var a=0;a<t;a+=1)e+=".";e+="\n"}return e},v=function(G,t){return 80*(G-1)+t+G-2},d=function(G,t,e){var n=g()(".".concat(G,".as400-screen"))[0],a=t,r=e;if(a-=1,r-=1,n.setSelectionRange)n.setSelectionRange(a,r);else if(n.createTextRange){var c=n.createTextRange();c.collapse(!0),c.moveEnd("character",r),c.moveStart("character",a),c.select()}},S=function(G,t){return g()(".".concat(G,".as400-screen")).val().substr(0,t).split("\n").length-1},b=function(G,t,e){var n=S(G,t);return t===e*(n+1)+n?e:(t-n)%e},y=function(G,t){var e=g()(".".concat(G,".as400-screen")).prop("selectionStart");return{row:S(G,e)+1,col:b(G,e,t)+1}},w=function(G,t){var e=g()(".".concat(G,".as400-screen")).prop("selectionEnd");return{row:S(G,e)+1,col:b(G,e,t)+1}},O=function(G,t,e){var n=g()(".".concat(G,".as400-screen"));return t!==e?n.val().substring(t,e):""},C=function(G,t){var e=function(G){var t=G.split(",");return{row:parseInt(t[0]),col:parseInt(t[1])}}(t),n=v(e.row,e.col);d(G,n,n)},j=function(G,t){for(var e=g()(".".concat(G,".as400-highlight")),n=e[0].innerHTML,a="",r=0;r<n.length;r+=1)p.a.isEmpty(t.mark1)||r!==v(t.mark1.row,t.mark1.col)?p.a.isEmpty(t.mark1)||r!==v(t.mark1.row,t.mark1.col)+t.mark1.text.length-1?p.a.isEmpty(t.mark2)||r!==v(t.mark2.row,t.mark2.col)?p.a.isEmpty(t.mark2)||r!==v(t.mark2.row,t.mark2.col)+t.mark2.text.length-1?p.a.isEmpty(t.mark3)||r!==v(t.mark3.row,t.mark3.col)?p.a.isEmpty(t.mark3)||r!==v(t.mark3.row,t.mark3.col)+t.mark3.text.length-1?a+=n[r]:a+="".concat(n[r],"</as400-mark-3>"):t.mark3.text.length<2?a+="<as400-mark-3>".concat(n[r],"</as400-mark-3>"):a+="<as400-mark-3>".concat(n[r]):a+="".concat(n[r],"</as400-mark-2>"):t.mark2.text.length<2?a+="<as400-mark-2>".concat(n[r],"</as400-mark-2>"):a+="<as400-mark-2>".concat(n[r]):a+="".concat(n[r],"</as400-mark-1>"):t.mark1.text.length<2?a+="<as400-mark-1>".concat(n[r],"</as400-mark-1>"):a+="<as400-mark-1>".concat(n[r]);e.html(a)},M=(e(17),function(G){function t(G){var e;return Object(r.a)(this,t),(e=Object(o.a)(this,Object(i.a)(t).call(this,G))).markAllCheckString=function(G){var t=e.state.id;e.clearAllMarkChackString(t),e.setState({markList:G}),j(t,G)},e.clearAllMarkChackString=function(G){var t=e.state,n=t.rowSize,a=t.colSize;g()(".".concat(G,".as400-highlight")).html(f(n,a)),e.setState({markList:{}})},e.markStringChackString=function(G,t){var r,c=e.state.markList;r=Object(a.a)({},c,Object(n.a)({},G.replace("-",""),t)),e.setState({markList:r}),e.markAllCheckString(r)},e.clearMarkString=function(G){var t,r=e.state.markList;t=Object(a.a)({},r,Object(n.a)({},G.replace("-",""),{})),e.setState({markList:t}),e.markAllCheckString(t)},e.state={id:G.id,markList:G.highlightList,lastSelection:{startIndex:0,endIndex:0},rowSize:G.rows,colSize:G.cols},e}return Object(s.a)(t,G),Object(c.a)(t,[{key:"componentDidMount",value:function(){var G,t,e=this.props,n=e.id,a=e.rows,r=e.cols,c=e.text,o=e.style,i=e.cursor;!function(G,t,e){var n=g()(".".concat(G,".as400-screen"));n.attr("rows",t),n.attr("cols",e);var a=g()(".".concat(G,".as400-screen-temp"));a.attr("rows",t),a.attr("cols",e);var r=g()(".".concat(G,".as400-style"));r.attr("rows",t),r.attr("cols",e),g()(".".concat(G,".as400-highlight")).html(f(t,e))}(n,a,r),G=n,t=c,g()(".".concat(G,".as400-screen")).val(t),function(G,t,e){for(var n=g()(".".concat(G,".as400-style")),a=e,r="",c=0;c<t.length;c+=1){var o=t[c],i=a[c];"."===i||g.a.isEmptyObject(i)?r+=o:r+=o.replace(o,"<as400-".concat(i.toLowerCase(),"-style>$&</as400-").concat(i.toLowerCase(),"-style>"))}g()(n).html(r)}(n,c,o),C(n,i)}},{key:"render",value:function(){var G=this.props,t=G.id,e=G.readOnly;return u.a.createElement(k,{id:t,readOnly:e})}}]),t}(l.Component));M.defaultProps={id:(new Date).getTime(),rows:24,cols:80,text:"                                                                                \n                                                                            \n                                                                            \n                                                                            \n                                                                            \n================================================================================\n********************************************************************************\n================================================================================\n                                                                                \n  ######  ##       ##  ##    ##  ##      ########  ########  ########  #######  \n  ##      ###     ###  ##    ##  ##      ##    ##     ##     ##    ##  ##   ##  \n  ######  ####   ####  ##    ##  ##      ########     ##     ##    ##  #######  \n  ##      ## ## ## ##  ##    ##  ##      ##    ##     ##     ##    ##  ##  ##   \n  ######  ##  ###  ##  ########  ######  ##    ##     ##     ########  ##   ##  \n                                                                                \n================================================================================\n********************************************************************************\n================================================================================\n                                                                                \n                                                                                \n                                                                                \n                                                                                ",style:"................................................................................\n............................................................................\n............................................................................\n............................................................................\n............................................................................\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\n................................................................................\n  GGGGGG  GG       GG  GG    GG  GG      GGGGGGGG  GGGGGGGG  GGGGGGGG  GGGGGGG  \n  GG      GGG     GGG  GG    GG  GG      GG    GG     GG     GG    GG  GG   GG  \n  GGGGGG  GGGG   GGGG  GG    GG  GG      GGGGGGGG     GG     GG    GG  GGGGGGG  \n  GG      GG GG GG GG  GG    GG  GG      GG    GG     GG     GG    GG  GG  GG   \n  GGGGGG  GG  GGG  GG  GGGGGGGG  GGGGGG  GG    GG     GG     GGGGGGGG  GG   GG  \n................................................................................\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\n................................................................................\n................................................................................\n................................................................................\n.................................................................................",cursor:"0,0",readOnly:!1};var L=M,x=e(9),D=e(3),E=e.n(D),A="mark-1",H=function(G){function t(){var G,e;Object(r.a)(this,t);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=Object(o.a)(this,(G=Object(i.a)(t)).call.apply(G,[this].concat(a)))).onMouseUp=function(G){var t=e.state.id;g()(".".concat(t,".as400-screen")).mouseup((function(n){G(n),e.clearAllMarkChackString(t)}))},e.onDoubleClick=function(G){var t=e.state.id;g()(".".concat(t,".as400-screen")).dblclick((function(t){G(t)}))},e.onSelect=function(){var G=e.state,t=G.id,n=G.colSize;g()(".".concat(t,".as400-screen")).select((function(G){var a=G.target.selectionStart,r=G.target.selectionEnd,c=y(t,n),o={text:O(t,a,r),row:c.row,col:c.col};e.setState({lastSelection:{text:O(t,a,r),row:c.row,col:c.col}}),e.markStringChackString(A,o)}))},e.getFieldHighlight=function(){return e.state.markList[A.replace("-","")]},e.setFieldHighlight=function(G){e.markStringChackString(A,G)},e.clearFieldHighlight=function(){return e.clearMarkString(A)},e.getLastSelection=function(){return e.state.lastSelection},e}return Object(s.a)(t,G),Object(c.a)(t,[{key:"componentDidMount",value:function(){for(var G=arguments.length,e=new Array(G),n=0;n<G;n++)e[n]=arguments[n];Object(x.a)(Object(i.a)(t.prototype),"componentDidMount",this).apply(this,e),this.markAllCheckString(this.props.highlight);var a=this.props,r=a.onDoubleClick,c=a.onMouseUp;this.onSelect(),this.onMouseUp(c),this.onDoubleClick(r)}},{key:"render",value:function(){var G=this.props.id;return u.a.createElement(k,{id:G,readOnly:!0})}}]),t}(L);H.defaultProps={highlight:{}},H.propTypes={highlightList:E.a.object,onDoubleClick:E.a.func,onMouseUp:E.a.func};var U=H,z="mark-1",T="mark-3",F=function(G){function t(){var G,e;Object(r.a)(this,t);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=Object(o.a)(this,(G=Object(i.a)(t)).call.apply(G,[this].concat(a)))).onMouseUp=function(G){var t=e.state.id;g()(".".concat(t,".as400-screen")).mouseup((function(n){G(n),e.clearAllMarkChackString(t)}))},e.onDoubleClick=function(G){var t=e.state.id;g()(".".concat(t,".as400-screen")).dblclick((function(t){G(t)}))},e.onSelect=function(){var G=e.state,t=G.id,n=G.colSize;g()(".".concat(t,".as400-screen")).select((function(G){var a=G.target.selectionStart,r=G.target.selectionEnd,c=y(t,n),o={text:O(t,a,r),row:c.row,col:c.col};e.setState({lastSelection:{text:O(t,a,r),row:c.row,col:c.col}}),o.text.length<n?e.markStringChackString(T,o):1===o.col&&o.text.length>=n&&e.markStringChackString(z,o)}))},e.getListHighlight=function(){var G=z;return e.state.markList[G.replace("-","")]},e.setListHighlight=function(G){e.markStringChackString(z,G)},e.clearListHighlight=function(){return e.clearMarkString(z)},e.getFieldHighlight=function(){return e.state.markList[T.replace("-","")]},e.setFieldHighlight=function(G){e.markStringChackString(T,G)},e.clearFieldHighlight=function(){return e.clearMarkString(T)},e.getLastSelection=function(){return e.state.lastSelection},e}return Object(s.a)(t,G),Object(c.a)(t,[{key:"componentDidMount",value:function(){for(var G=arguments.length,e=new Array(G),n=0;n<G;n++)e[n]=arguments[n];Object(x.a)(Object(i.a)(t.prototype),"componentDidMount",this).apply(this,e),this.markAllCheckString(this.props.highlight);var a=this.props,r=a.onDoubleClick,c=a.onMouseUp;this.onSelect(),this.onMouseUp(c),this.onDoubleClick(r)}},{key:"render",value:function(){var G=this.props.id;return u.a.createElement(k,{id:G,readOnly:!0})}}]),t}(L);F.defaultProps={highlight:{}},F.propTypes={highlightList:E.a.object,onDoubleClick:E.a.func,onMouseUp:E.a.func};var N=F,I=function(G){function t(){var G,e;Object(r.a)(this,t);for(var n=arguments.length,a=new Array(n),c=0;c<n;c++)a[c]=arguments[c];return(e=Object(o.a)(this,(G=Object(i.a)(t)).call.apply(G,[this].concat(a)))).onMouseUp=function(G){var t=e.state.id;g()(".".concat(t,".as400-screen")).mouseup((function(n){G(n),e.clearAllMarkChackString(t)}))},e.onKeyDown=function(){var G=e.state,t=G.id,n=G.colSize;g()(".".concat(t,".as400-screen")).keydown((function(G){y(t,n),w(t,n)}))},e.onDoubleClick=function(G){var t=e.state.id;g()(".".concat(t,".as400-screen")).dblclick((function(t){G(t)}))},e.onSelect=function(){var G=e.state,t=G.id,n=G.colSize;g()(".".concat(t,".as400-screen")).select((function(G){var a=G.target.selectionStart,r=G.target.selectionEnd,c=y(t,n);e.setState({lastSelection:{text:O(t,a,r),row:c.row,col:c.col}})}))},e.getHighlight=function(G){return e.state.markList[G.replace("-","")]},e.setHighlight=function(G,t){e.markStringChackString(G,t)},e.clearHighlight=function(G){return e.clearMarkString(G)},e.getHighlightList=function(){return e.state.markList},e.setHighlightList=function(G){e.markAllCheckString(G)},e.clearHighlightList=function(){e.clearAllMarkChackString(e.props.id)},e.getLastSelection=function(){return e.state.lastSelection},e}return Object(s.a)(t,G),Object(c.a)(t,[{key:"componentDidMount",value:function(){for(var G=arguments.length,e=new Array(G),n=0;n<G;n++)e[n]=arguments[n];Object(x.a)(Object(i.a)(t.prototype),"componentDidMount",this).apply(this,e),this.markAllCheckString(this.props.highlight);var a=this.props,r=a.onDoubleClick,c=a.onMouseUp;this.onSelect(),this.onKeyDown(),this.onMouseUp(c),this.onDoubleClick(r)}},{key:"render",value:function(){var G=this.props,t=G.id,e=G.readOnly;return u.a.createElement(k,{id:t,readOnly:e})}}]),t}(L);I.defaultProps={highlight:{}},I.propTypes={highlightList:E.a.object,onDoubleClick:E.a.func,onMouseUp:E.a.func};var P=I;t.default=[L,U,N,P]}},[[12,1,2]]]);
//# sourceMappingURL=main.b922e641.chunk.js.map