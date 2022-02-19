import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('IdentityProvider', function () {
  it('Add User with Params', async function () {
    const IdentityProvider = await ethers.getContractFactory('IdentityProvider')
    const provider = await IdentityProvider.deploy()
    await provider.deployed()

    const addUserTx = await provider.add_user2('rokserak', 'Rok', 'Serak')
    await addUserTx.wait()

    expect(await provider.user_count()).to.be.equal(1)
  })

  it('Add User with Struct', async function () {
    const IdentityProvider = await ethers.getContractFactory('IdentityProvider')
    const provider = await IdentityProvider.deploy()
    await provider.deployed()

    const addUserTx = await provider.add_user({
      name: 'rokserak',
      given_name: 'Rok',
      family_name: 'Serak',
    })
    await addUserTx.wait()

    expect(await provider.user_count()).to.be.equal(1)
  })

  it('Get Users Information', async function () {
    const IdentityProvider = await ethers.getContractFactory('IdentityProvider')
    const provider = await IdentityProvider.deploy()
    await provider.deployed()

    const updateUserTx = await provider.add_user2('rokserak', 'Rok', 'Serak')
    await updateUserTx.wait()

    const info = await provider.get_user_info()
    expect(info.name).to.be.equal('rokserak')
    expect(info.given_name).to.be.equal('Rok')
    expect(info.family_name).to.be.equal('Serak')

    expect(await provider.get_name()).to.be.equal('rokserak')
    expect(await provider.get_full_name()).to.be.equal('Rok Serak')
  })

  it('Update User with Struct', async function () {
    const IdentityProvider = await ethers.getContractFactory('IdentityProvider')
    const provider = await IdentityProvider.deploy()
    await provider.deployed()

    const addUserTx = await provider.add_user({
      name: 'rokserak',
      given_name: 'Rok',
      family_name: 'Serak',
    })
    await addUserTx.wait()

    let info = await provider.get_user_info()
    expect(info.name).to.be.equal('rokserak')
    expect(info.given_name).to.be.equal('Rok')
    expect(info.family_name).to.be.equal('Serak')

    const updateUserTx = await provider.update_user({
      name: 'johndoe',
      given_name: 'John',
      family_name: 'Doe',
    })
    await updateUserTx.wait()

    info = await provider.get_user_info()
    expect(info.name).to.be.equal('johndoe')
    expect(info.given_name).to.be.equal('John')
    expect(info.family_name).to.be.equal('Doe')
  })
})
