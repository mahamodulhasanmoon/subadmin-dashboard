// import  { useContext } from 'react'
import { handleCopyClick } from '../../utils/copyToClipboard'
// import { AuthContext } from '../../Contexts/AuthProvider'

// export default function InputField({email,userId}:{
//     email:string,
//     userId:string
// }) {
//     const {user:{_id}} = useContext(AuthContext)
//   return (
//     <>
//         <td
//   onClick={() => handleCopyClick(
//     _id !== userId
//       ? email && (email as string)?.split('').slice(0, 2).join('') + '********'
//       : status
//       ? (email as string).replace(/^(.{2})(.{1})/, '$1')
//       : email
//   )}
//   className="px-2 py-1 font-bold cursor-pointer"
// >
//   <input
//     type="text"
//     className="p-2 dark:bg-graydark bg-bodydark1"
//     value={
//       _id !== userId
//         ? email && (email as string)?.split('').slice(0, 2).join('') + '*********'
//         : status
//         ? (email as string).replace(/^(.{2})(.{2})/, '$1')
//         : email
//     }
//   />
// </td>

//     </>
//   )
// }





export default function InputField({
  email,
  
}: {
  email: string;
  userId: string;
}) {
  return (
    <>
      <td
        onClick={() => handleCopyClick(email)}
        className="px-2 py-1 font-bold cursor-pointer"
      >
        <input
          type="text"
          className="p-2 dark:bg-graydark bg-bodydark1"
          value={email}
          readOnly
        />
      </td>
    </>
  );
}


