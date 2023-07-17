export const CandySearch = ({setterFunction}) => {
    return (
        <div className="search">
            <h2 className="search__header">What candy are you looking for?</h2>
            <input
                autoFocus
                type="text"
                className="form-control"
                placeholder="search our candies"
                onChange={
                    (e) => {
                        setterFunction(e.target.value)
                    }
                }
                />
                
            
        </div>
    )  
}