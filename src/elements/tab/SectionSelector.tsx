

interface SectionSelectorInterface <T extends string> {
    sections: T[],
    selectedSection: T,
    setSelectedSection: (section: T )=> void
}

const SectionSelector = <T extends string>({ 
    sections,
    selectedSection,
    setSelectedSection
}: SectionSelectorInterface<T>) => {
    return (
        <>
            <div className='w-100 flex flex-row justify-start items-center gap-2 mb-[20px]'>
                {sections.map(section=> (
                    <div 
                        key={section}
                        className={
                        `${selectedSection ===section? 'border-black': "border-[#edebeb]"} 
                        rounded-[20px] px-[20px] py-[8px] font-bold cursor-pointer text-black bg-white border hover:bg-grey`}
                        onClick={()=> setSelectedSection(section)}
                    > 
                        {section}
                    </div>
                ))}
            </div>
        </>
    )
}

export default SectionSelector;
