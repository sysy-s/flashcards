export default function GoodAnsBtn(){
  return <div 
  onClick={e => console.log(e)}
  className="p-3 w-16 h-16 text-center bg-white text-green-400 outline outline-green-400 text-4xl rounded-full shadow-md hover:cursor-pointer hover:bg-green-400 hover:text-white">✓</div>
}