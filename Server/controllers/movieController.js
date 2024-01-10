


export const  getMovies = async (req, res) => {
    try {
        
        res.status(200).json("hi fsdfsd")
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}