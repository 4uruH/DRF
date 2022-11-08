import React from 'react'

const RandUserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.birthday_year}
            </td>
        </tr>
    )
}

const RandUserList = ({users}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Birthday year
            </th>
                {users.map((user) => <RandUserItem user={user} />)}
        </table>
    )
}
export default RandUserList
