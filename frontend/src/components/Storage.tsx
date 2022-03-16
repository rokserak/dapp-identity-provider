import React, { useEffect, useState } from 'react'
import { BigNumber, providers } from 'ethers'
import { JsonRpcSigner } from '@ethersproject/providers/src.ts/json-rpc-provider'
import { CoreAPI, init } from '@textile/eth-storage'

interface Props {

}

export const Storage: React.FC<Props> = () => {
  const [provider, setProvider] = useState<providers.Web3Provider>()
  const [wallet, setWallet] = useState<JsonRpcSigner>()
  const [storage, setStorage] = useState<CoreAPI<BigNumber>>()
  const [fileCID, setFileCID] = useState<string>()
  const [fileURL, setFileURL] = useState<string>()

  useEffect(() => {
    window.ethereum?.enable().then(() => {
      console.log('MetaMask enabled')
      const _provider = new providers.Web3Provider(window.ethereum)
      setProvider(_provider)
      const _wallet = _provider.getSigner()
      setWallet(_wallet)
      init(_wallet).then(_storage => {
        setStorage(_storage)
      })
    })
  }, [])

  const addFile = () => {
    const blob = new Blob(['Hello, world!'], { type: 'text/plain' })
    const file = new File([blob], 'welcome.txt', {
      type: 'text/plain',
      lastModified: new Date().getTime()
    })

    storage?.addDeposit().finally(() => {
      storage.store(file).then(({id, cid}) => {
        setFileCID(cid['/'])
        console.log(cid['/'])
        storage.status(id).then(() => {
          console.log('All Done, File stored')
          // storage.releaseDeposit()
          //   .then(() => console.log('Storage deposit released'))
          //   .catch(console.error)
        }).catch(console.error)
      }).catch(console.error)
    })
  }

  const getFile = () => {
    if (fileCID) {
      storage?.fetchByCid(fileCID).then(response => {
        console.log(response)
        setFileURL(response.url)
      }).catch(console.error)
    } else {
      console.log('file not stored yet, missing CID')
    }
  }

  return (
    <div>
      <h1>Storage</h1>
      <button onClick={addFile}>add file</button>
      <button onClick={getFile}>get file</button>
      {fileURL && <div>
        <embed type="text/plain" src={fileURL} />
      </div>}
    </div>
  )
}
