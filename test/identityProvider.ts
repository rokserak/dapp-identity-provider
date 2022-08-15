import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('IdentityProvider', function () {
  it('Add User', async function () {
    const IdentityProvider = await ethers.getContractFactory('IdentityProvider')
    const provider = await IdentityProvider.deploy()
    await provider.deployed()

    const addUserTx = await provider.addUser({
      nickname: 'rokserak',
      given_name: 'Rok',
      middle_name: '',
      family_name: 'Serak',
      email: 'rok.serak@gmail.com',
      picture: '#',
    })
    await addUserTx.wait()

    expect(await provider.userCount()).to.be.equal(1)
  })

  it('Get Users Information', async function () {
    const IdentityProvider = await ethers.getContractFactory('IdentityProvider')
    const provider = await IdentityProvider.deploy()
    await provider.deployed()

    const addUserTx = await provider.addUser({
      nickname: 'rokserak',
      given_name: 'Rok',
      middle_name: '',
      family_name: 'Serak',
      email: 'rok.serak@gmail.com',
      picture: '#',
    })
    await addUserTx.wait()

    const info = await provider.getUserInfo()
    expect(info.nickname).to.be.equal('rokserak')
    expect(info.given_name).to.be.equal('Rok')
    expect(info.family_name).to.be.equal('Serak')
    expect(info.name).to.be.equal('Rok Serak')
  })

  it('Update User with Struct', async function () {
    const IdentityProvider = await ethers.getContractFactory('IdentityProvider')
    const provider = await IdentityProvider.deploy()
    await provider.deployed()

    const addUserTx = await provider.addUser({
      nickname: 'rokserak',
      given_name: 'Rok',
      middle_name: '',
      family_name: 'Serak',
      email: 'rok.serak@gmail.com',
      picture: '#',
    })
    await addUserTx.wait()

    let info = await provider.getUserInfo()
    expect(info.nickname).to.be.equal('rokserak')
    expect(info.given_name).to.be.equal('Rok')
    expect(info.family_name).to.be.equal('Serak')

    const updateUserTx = await provider.updateUser({
      nickname: 'johndoe',
      given_name: 'John',
      middle_name: '',
      family_name: 'Doe',
      email: '',
      picture: '',
    })
    await updateUserTx.wait()

    info = await provider.getUserInfo()
    expect(info.nickname).to.be.equal('johndoe')
    expect(info.given_name).to.be.equal('John')
    expect(info.family_name).to.be.equal('Doe')
    expect(info.name).to.be.equal('John Doe')
    expect(info.email).to.be.equal('')
    expect(info.picture).to.be.equal('')
  })
})
