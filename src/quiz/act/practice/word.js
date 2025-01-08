function Word(
    {
        this_stage,
        next_stage,
        game_data
    }
){
    const handleClick = () => {
        this_stage(false)
        next_stage(true)
      }
    return(
        <div>
            Word
            <button
        className="Next"
        onClick={handleClick}
        style={{ marginTop: "1vh" }}
      >
        Confirm
      </button>
        </div>
        
    )
}
export default Word;