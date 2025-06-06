import {USERS_DATA} from '@/data/usersData'
import DirectoryContent from '@/components/Directory/DirectoryContent'


export default function FetchDirectory() {
    return (
        <>
          <DirectoryContent users={USERS_DATA}/>
        </>
    )
}