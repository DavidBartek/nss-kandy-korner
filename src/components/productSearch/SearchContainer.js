// PARENT: enables CandySearch and CandyFound to share state

import { useState } from "react"
import { CandyFound } from "./CandyFound"
import { CandySearch } from "./CandySearch"

export const SearchContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <CandySearch setterFunction={setSearchTerms} />
        <CandyFound searchTermsState={searchTerms}/>
    </>
}