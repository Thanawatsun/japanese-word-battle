function Quiz({setIsPlayer}) {
    const handleTostage = () => {
        console.log('let go')
        setIsPlayer(false)
      };
    return(
        <div>
            <button onClick={handleTostage}>leave</button>
        </div>
    )
}
export default Quiz;