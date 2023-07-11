import React, { useState } from 'react'
import "../../styles/sideBar/style.css";
import "../../pages/sideBarPage.tsx"

type releaseNote = {
    id: number;
    version: string;
};

type projectType = {
    id: number;
    projectName: String;
    releaseNotes: releaseNote[];
};

function sideBarNote(props: any) {
    const [releaseNote, setReleaseNote] = useState<releaseNote>(props.myNote);
    
    console.log(releaseNote);

    return (
        <div className="flex-1 ml-3 whitespace-nowrap inline-block align-baseline">
            {releaseNote.version}
        </div>
    )
}

export default sideBarNote;