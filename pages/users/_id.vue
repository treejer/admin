<template>
  <div class="container user-page-details" v-if="userDetails">
    <div class="row">
      <div class="col-12 position-relative  col-12 col-xl-12 col-lg-11 offset-lg-1 offset-xl-0">
        <div
          class="banner"
          :style="`background-image:url(${$avatarByWallet(
            userDetails.user.publicAddress
          )})`"
        ></div>

        <div class="box-banner-details text-capitalize">
          <div class="row">
            <div class="col-md-3 user-img">
              <img
                class="img-rounded"
                :src="`${$avatarByWallet(userDetails.user.publicAddress)}`"
                :alt="
                  userDetails.user.email
                    ? userDetails.user.email
                    : userDetails.user.firstName
                "
              />
              <h1 class="title-md tr-gray-nine mt-2 font-weight-bolder">
                {{
                  userDetails.user.firstName
                    ? userDetails.user.firstName + userDetails.user.lastName
                    : "User name"
                }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          mt-5
          font-weight-bolder
          param-gray-two
          user-detail-main
          position-relative
          over-flow-hidden
          w-100
        "
      >
        <div class="edit-button text-capitalize">
          <img
            class="pointer-event"
            src="~/assets/images/users/edit-button.svg"
            alt=""
            @click.prevent="changeProfile()"
          />

          <b-button class="btn-green" v-b-modal.modal-1 v-if="txData"
            >Show Verify Box</b-button
          >
          <b-modal
            id="modal-1"
            hide-footer
            title="Verification Detail"
            v-if="txData"
          >
            <p>
              Role: (Byte32)
              <input type="text" v-model="txData.roleValue" />
            </p>

            <p>
              publicAddress
              <input type="text" v-model="txData.publicAddress" />
            </p>

            <p>
              longitude
              <input type="text" v-model="txData.longitude" />
            </p>

            <p>
              latitude
              <input type="text" v-model="txData.latitude" />
            </p>

            <p>
              organizationAddress
              <input type="text" v-model="txData.organizationAddress" />
            </p>

            <p>
              referrer
              <input type="text" v-model="txData.referrer" />
            </p>

            <p>
              countryCode ({{ userDetails.user.mobileCountry }})
              <a target="_blank" href="https://www.iban.com/country-codes"
                >(check here)</a
              >
              <input type="text" v-model="txData.countryCode" />
            </p>

            <p>
              type

              <select v-model="txData.type">
                <option value="1">Individual</option>
                <option value="2">Organization</option>
                <option value="3">Memeber of organization</option>
              </select>
            </p>

            <p>
              capacity
              <input type="text" v-model="txData.capacity" />
            </p>

            <p>roleGranted: {{ roleGranted }}</p>

            <p>planterStatus: {{ planterStatus }}</p>

            <button
              v-if="this.roleGranted === false && this.planterStatus !== 1"
              class="btn-green join-by-admin"
              @click.prevent="joinByAdmin()"
            >
              Join Planter onchain
            </button>

            <button
              :class="userDetails.user.isVerified ? 'btn-warning' : 'btn-green'"
              @click.prevent="sendVerifyAndReject()"
            >
              {{ userDetails.user.isVerified ? "Reject" : "Verify" }} Offchain
            </button>

            <div class="row" v-if="loginedUserIsAdmin">
              <div class="col-12">
                <h4>Regular trasanctions</h4>

                <button
                  v-if="this.roleGranted === false"
                  :class="{ disable: loading.grantPlanterRole }"
                  class="btn-green-md mt-1 mb-1"
                  @click="grantPlanterRole()"
                >
                  <BSpinner
                    v-if="loading.grantPlanterRole"
                    class="mr-2"
                    small
                    type="grow"
                    >loading.grantPlanterRole</BSpinner
                  >
                  Grant Planter Role
                </button>

                <button
                  v-if="this.planterStatus !== 1"
                  :class="{ disable: loading.joinPlanter }"
                  class="btn-green-md mt-1 mb-1"
                  @click="joinPlanter()"
                >
                  <BSpinner
                    v-if="loading.joinPlanter"
                    class="mr-2"
                    small
                    type="grow"
                    >loading.joinPlanter</BSpinner
                  >
                  Join Planter
                </button>

                <h4>Grant High Level roles</h4>

                <p>
                  Role:
                  <select v-model="selectedRole">
                    <option value="verifier">Verifier</option>
                    <option value="datamanager">Data Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </p>

                <button
                  :class="{ disable: loading.granHighLevelRole }"
                  class="btn-green-md mt-1 mb-1"
                  @click="granHighLevelRole()"
                >
                  <BSpinner
                    v-if="loading.granHighLevelRole"
                    class="mr-2"
                    small
                    type="grow"
                    >loading.granHighLevelRole</BSpinner
                  >
                  Grant
                </button>
              </div>
            </div>
          </b-modal>
        </div>

        <h2 class="title tr-gray-two mb-md-4 font-weight-bolder">User Info</h2>

        <p>
          ID: <span>{{ userDetails.user._id }}</span>
        </p>
        <p>
          First name: <span>{{ userDetails.user.firstName }}</span>
        </p>
        <p>
          Last name: <span>{{ userDetails.user.lastName }}</span>
        </p>
        <p>
          Public Address: <span>{{ userDetails.user.publicAddress }}</span>
        </p>

        <p>
          Createdat:
          <span>{{
            $moment(userDetails.user.createdAt).strftime("%Y-%m-%d %I:%M")
          }}</span>
        </p>
        <p>
          Email: <span>{{ userDetails.user.email }}</span>
        </p>
        <p>
          Email token: <span>{{ userDetails.user.emailToken }}</span>
        </p>
        <p>
          Email verifiedat:
          <span>{{
            userDetails.user.emailVerifiedAt
              ? $moment(userDetails.user.emailVerifiedAt).strftime(
                  "%Y-%m-%d %I:%M"
                )
              : "-"
          }}</span>
        </p>
        <p>
          Is admin: <span>{{ userDetails.user.isAdmin }}</span>
        </p>
        <p>
          Is verified: <span>{{ userDetails.user.isVerified }}</span>
        </p>
        <p>
          Last loginat: <span>{{ userDetails.user.lastLoginAt }}</span>
        </p>
        <p>
          Mobile: <span>{{ userDetails.user.mobile }}</span>
        </p>
        <p>
          Mobile code: <span>{{ userDetails.user.mobileCode }}</span>
        </p>
        <p>
          Mobile code requestedat:
          <span>{{ userDetails.user.mobileCodeRequestedAt }}</span>
        </p>
        <p>
          Mobile code requests count for today:
          <span>{{ userDetails.user.mobileCodeRequestsCountForToday }}</span>
        </p>
        <p>
          Mobile country: <span>{{ userDetails.user.mobileCountry }}</span>
        </p>
        <p>
          Mobile verifiedat:
          <span>{{ userDetails.user.mobileVerifiedAt }}</span>
        </p>
        <p>
          Signedat: <span>{{ userDetails.user.signedAt }}</span>
        </p>

        <p v-if="userDetails.file">
          {{ userDetails.file.filename }}

          <button class="btn-green btn" @click.prevent="downloadFiles()">
            Download File
          </button>
          <img
            :src="`${imgSrcAdmin}/files/${userDetails.file.filename}`"
            alt=""
          />
        </p>

        <div v-if="userDetails.application">
          <h2 class="title tr-gray-two mb-md-3 mt-md-5 font-weight-bolder">
            Application Info
          </h2>
          <p>
            Latitude: <span> {{ userDetails.application.latitude }}</span>
          </p>
          <p>
            Longitude: <span> {{ userDetails.application.longitude }}</span>
          </p>

          <p>
            <a
              class=""
              :href="`https://www.google.com/maps/search/?api=1&query=${userDetails.application.latitude},${userDetails.application.longitude}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on googlemap
            </a>
          </p>

          <p>
            OrganizationAddress:
            <span> {{ userDetails.application.organizationAddress }}</span>
          </p>
          <p>
            Referrer: <span> {{ userDetails.application.referrer }}</span>
          </p>
          <p>
            Status: <span> {{ userDetails.application.status }}</span>
          </p>
          <p>
            Type:
            <span>
              {{ userDetails.application.type }} -
              {{
                userDetails.application.type === 1
                  ? "Planter"
                  : userDetails.application.type === 2
                  ? "Organization"
                  : "Member of Organization"
              }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccessRestrictionABI from "~/static/abis/AccessRestriction.json";
import PlanterABI from "~/static/abis/Planter.json";
import countries from "~/static/data/countries.min.json";

import Web3Adapter from "@gnosis.pm/safe-web3-lib";
import Safe from "@gnosis.pm/safe-core-sdk";
import SafeServiceClient from "@gnosis.pm/safe-service-client";
import { saveAs } from 'file-saver';
export default {
  layout: "dashboard",
  data() {
    return {
      userDetails: null,
      txData: null,
      AccessRestrictionContract: null,
      PlanterContract: null,
      roleGranted: false,
      planterStatus: 0,
      loginedUserIsAdmin: false,
      selectedRole: "verifier",
      loading: {
        grantPlanterRole: false,
        joinPlanter: false,
        granHighLevelRole: false,
        avatar:false
      },
      imgSrcAdmin: process.env.API_URL,
    };
  },
  async mounted() {
    await this.getUser();

    if (this.userDetails && this.userDetails) {
      await this.setNeededContracts();
      await this.setContractsData();
    }

  },
  methods: {
    changeProfile() {},
    async getUser() {
      let self = this;
      await self.$axios
        .$get(`${this.$cookies.get('config').apiUrl}/admin/users/${self.$route.params.id}`, {
          headers: {
            Accept: "application/json",
            "x-auth-userid": self.$cookies.get("userId"),
            "x-auth-logintoken": self.$cookies.get("loginToken"),
          },
        })
        .then((result) => {
          self.userDetails = result;

          self.txData = {
            publicAddress: result.user.publicAddress,
            roleValue: self.$web3.utils.soliditySha3("PLANTER_ROLE"),
          };

          // set txData
          if (result.application) {
            self.txData = {
              roleValue: self.$web3.utils.soliditySha3("PLANTER_ROLE"),
              publicAddress: result.user.publicAddress,
              longitude: Math.trunc(
                result.application.longitude * Math.pow(10, 6)
              ),
              latitude: Math.trunc(
                result.application.latitude * Math.pow(10, 6)
              ),
              organizationAddress: result.application.organizationAddress
                ? result.application.organizationAddress
                : process.env.zeroAddress,
              referrer: result.application.referrer
                ? result.application.referrer
                : process.env.zeroAddress,
              countryCode: null,
              type: result.application.type,
              capacity: result.application.type == 2 ? 500 : 100,
            };

            if (
              result.application.organizationAddress != null &&
              result.application.organizationAddress != "" &&
              result.application.organizationAddress != process.env.zeroAddress
            ) {
              self.txData.type = 3;
            }

            let foundCountry = countries.find(function (country, index) {
              if (country.iso == result.user.mobileCountry) {
                return true;
              }
            });

            if (foundCountry) {
              self.txData.countryCode = foundCountry.numcode;
            }
          }
        })
        .catch((err) => {
          console.log(err, "err is here");
        });
    },
   
    async downloadFiles() {
      let self =this;
       await self.$axios
          .$get(
            `${this.$cookies.get('config').apiUrl}/files/${self.userDetails.file.filename}`,
            {
              headers: {
                "accept": "application/json",
                "x-auth-userid": self.$cookies.get("userId"),
                "x-auth-logintoken": self.$cookies.get("loginToken"),
              },
            },
            {
              responseType: "blob",
            }
          )
          .then((res) => {
            this.loading.avatar = true
            
            let filename =
            self.userDetails.user.firstName +
            " " +
            self.userDetails.user.lastName +
            " - " +
            self.userDetails.file.filename;
            
            saveAs(`${this.$cookies.get('config').apiUrl}/files/${self.userDetails.file.filename}`, filename);



          })
          .catch((error) => {
            console.log(error, "error is here");
          });
    },
    async sendVerifyAndReject() {
      if (!confirm("Do you really want to change status?")) {
        return;
      }

      let self = this;

      const path = this.userDetails.user.isVerified ? "reject" : "verify";

      console.log(
        path,
        this.roleGranted,
        this.planterStatus,
        typeof this.roleGranted,
        typeof this.planterStatus
      );

      if (
        path === "verify" &&
        (this.roleGranted === false || this.planterStatus !== 1)
      ) {
        this.$bvToast.toast("This planter not exist on planter contract", {
          variant: "danger",
          title: "Not planter",
          toaster: "b-toaster-bottom-left",
        });
        return;
      }

      await self.$axios
        .$patch(
          `${this.$cookies.get('config').apiUrl}/admin/${path}?userid=${this.userDetails.user._id}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "x-auth-userid": self.$cookies.get("userId"),
              "x-auth-logintoken": self.$cookies.get("loginToken"),
            },
          }
        )
        .then((res) => {
          console.log(res, "res is here");

          if (res.statusCode) {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Forbidden",
              toaster: "b-toaster-bottom-left",
            });
          } else {
            self.$bvToast.toast(
              `User status successfully changed to ${
                this.userDetails.user.isVerified ? "Rejected" : "Verified"
              }`,
              {
                variant: "success",
                title: "Update status successful",
                toaster: "b-toaster-bottom-left",
              }
            );

            self.getUser();
          }
        })
        .catch((err) => {
          console.log(err, "err is here");

          self.$bvToast.toast(err.message, {
            variant: "danger",
            title: "Forbidden",
            toaster: "b-toaster-bottom-left",
          });
        });
    },
    async setNeededContracts() {
      this.AccessRestrictionContract = new this.$web3.eth.Contract(
        AccessRestrictionABI,
        this.$cookies.get('config').contactArAddress
      );
      this.PlanterContract = new this.$web3.eth.Contract(
        PlanterABI,
        this.$cookies.get('config').contactPlanterAddress
      );
    },
    async setContractsData() {
      let self = this;

      await this.AccessRestrictionContract.methods
        .hasRole(this.txData.roleValue, this.txData.publicAddress)
        .call()
        .then(function (result) {
          self.roleGranted = result;
        });

      await this.PlanterContract.methods
        .planters(this.txData.publicAddress)
        .call()
        .then(function (result) {
          self.planterStatus = Number(result.status);
        });

      await this.AccessRestrictionContract.methods
        .hasRole(
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          this.$cookies.get("account")
        )
        .call()
        .then(function (result) {
          console.log(result, "loginedUserIsAdmin result is here");
          self.loginedUserIsAdmin = result;
        });
    },
    async grantPlanterRole() {
      let self = this;

      this.loading.grantPlanterRole = true;

      if (!confirm("Are you sure?")) {
        this.loading.grantPlanterRole = false;
        return;
      }

      let account = this.$cookies.get("account");

      this.$web3.currentProvider.enable();

      try {
        const tx = this.AccessRestrictionContract.methods.grantRole(
          this.txData.roleValue,
          this.txData.publicAddress
        );
        let gas = await tx.estimateGas({ from: account });

        const receipt = await this.$web3.eth
          .sendTransaction({
            from: account,
            to: this.AccessRestrictionContract._address,
            value: 0,
            data: tx.encodeABI(),
            gas: gas,
            type: "0x2",
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          })
          .on("transactionHash", (transactionHash) => {
            self.$bvToast.toast(["Check progress on Etherscan"], {
              toaster: "b-toaster-bottom-left",
              title: "Processing transaction...",
              variant: "warning",
              href: `${process.env.explorerUrl}/tx/${transactionHash}`,
              bodyClass: "fund-error",
              noAutoHide: true,
            });
          })
          .on("error", (error) => {
            console.log(error, "errorr");
            if (error.code === 32602) {
              self.$bvToast.toast(["You don't have enough Ether (ETH)"], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                href: `${process.env.explorerUrl}/tx/${transactionHash}`,
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            } else if (error.code === -32602) {
              //do nothing
            } else {
              self.$bvToast.toast([error.message.substring(0, 100)], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                href: `${process.env.explorerUrl}/tx/${transactionHash}`,
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            }
          });

        if (receipt && receipt.transactionHash) {
          this.$bvToast.toast(["Planter Role granted successfuly"], {
            toaster: "b-toaster-bottom-left",
            title: "Transaction is successful",
            variant: "success",
            href: `${process.env.explorerUrl}/tx/${receipt.transactionHash}`,
          });

          this.roleGranted = true;
        }
      } catch (error) {
        console.log(error, "errorr");

        self.$bvToast.toast([error.message.substring(0, 100)], {
          toaster: "b-toaster-bottom-left",
          title: "Error occured!",
          variant: "danger",
          noAutoHide: true,
          bodyClass: "fund-error",
        });
      }

      this.loading.grantPlanterRole = false;
    },
    async granHighLevelRole() {
      //       const DEFAULT_ADMIN_ROLE ="0x0000000000000000000000000000000000000000000000000000000000000000";
      // const PLANTER_ROLE = web3.utils.soliditySha3("PLANTER_ROLE");
      // const DATA_MANAGER_ROLE = web3.utils.soliditySha3("DATA_MANAGER_ROLE");
      // const SCRIPT_ROLE = web3.utils.soliditySha3("SCRIPT_ROLE");
      // const VERIFIER_ROLE = web3.utils.soliditySha3("VERIFIER_ROLE");

      let roleValue = this.$web3.utils.soliditySha3("VERIFIER_ROLE");
      if (this.selectedRole === "datamanager") {
        roleValue = this.$web3.utils.soliditySha3("DATA_MANAGER_ROLE");
      } else if (this.selectedRole === "admin") {
        roleValue =
          "0x0000000000000000000000000000000000000000000000000000000000000000";
      }

      console.log(roleValue, "roleValue");
      console.log(this.txData.publicAddress, "this.txData.publicAddress");

      let self = this;

      this.loading.granHighLevelRole = true;

      if (
        !confirm(
          `Are you sure to grant ${this.selectedRole} Role to this wallet ${this.txData.publicAddress} ?`
        )
      ) {
        this.loading.granHighLevelRole = false;
        return;
      }

      let account = this.$cookies.get("account");

      this.$web3.currentProvider.enable();

      try {
        const tx = this.AccessRestrictionContract.methods.grantRole(
          roleValue,
          this.txData.publicAddress
        );
        let gas = await tx.estimateGas({ from: account });

        const receipt = await this.$web3.eth
          .sendTransaction({
            from: account,
            to: this.AccessRestrictionContract._address,
            value: 0,
            data: tx.encodeABI(),
            gas: gas,
            type: "0x2",
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          })
          .on("transactionHash", (transactionHash) => {
            self.$bvToast.toast(["Check progress on Etherscan"], {
              toaster: "b-toaster-bottom-left",
              title: "Processing transaction...",
              variant: "warning",
              href: `${process.env.explorerUrl}/tx/${transactionHash}`,
              bodyClass: "fund-error",
              noAutoHide: true,
            });
          })
          .on("error", (error) => {
            console.log(error, "errorr");
            if (error.code === 32602) {
              self.$bvToast.toast(["You don't have enough Ether (ETH)"], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                href: `${process.env.explorerUrl}/tx/${transactionHash}`,
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            } else if (error.code === -32602) {
              //do nothing
            } else {
              self.$bvToast.toast([error.message.substring(0, 100)], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                href: `${process.env.explorerUrl}/tx/${transactionHash}`,
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            }
          });

        if (receipt && receipt.transactionHash) {
          this.$bvToast.toast(
            [this.selectedRole + " Role granted successfuly"],
            {
              toaster: "b-toaster-bottom-left",
              title: "Transaction is successful",
              variant: "success",
              href: `${process.env.explorerUrl}/tx/${receipt.transactionHash}`,
            }
          );
        }
      } catch (error) {
        console.log(error, "errorr");

        self.$bvToast.toast([error.message.substring(0, 100)], {
          toaster: "b-toaster-bottom-left",
          title: "Error occured!",
          variant: "danger",
          noAutoHide: true,
          bodyClass: "fund-error",
        });
      }

      this.loading.granHighLevelRole = false;
    },
    async joinPlanter() {
      let self = this;

      this.loading.joinPlanter = true;

      if (
        !confirm(
          "Are you sure to join planter? This transaction is irreversible!"
        )
      ) {
        this.loading.joinPlanter = false;
        return;
      }

      let account = this.$cookies.get("account");

      this.$web3.currentProvider.enable();

      try {
        let tx = null;
        if (this.txData.type == 2) {
          tx = this.PlanterContract.methods.joinOrganization(
            this.txData.publicAddress,
            this.txData.longitude,
            this.txData.latitude,
            this.txData.countryCode,
            this.txData.capacity,
            this.txData.referrer
          );
        } else {
          if (
            this.txData.type == 3 &&
            (this.txData.organizationAddress == process.env.zeroAddress ||
              this.txData.organizationAddress == "")
          ) {
            this.$bvToast.toast("Please select organization", {
              variant: "danger",
              title: "Validation error",
              toaster: "b-toaster-bottom-left",
            });
            return;
          }

          if (
            this.txData.type == 1 &&
            this.txData.organizationAddress != process.env.zeroAddress
          ) {
            this.$bvToast.toast("Organization must be zero Address", {
              variant: "danger",
              title: "Validation error",
              toaster: "b-toaster-bottom-left",
            });
            return;
          }

          tx = this.PlanterContract.methods.joinByAdmin(
            this.txData.publicAddress,
            this.txData.type,
            this.txData.longitude,
            this.txData.latitude,
            this.txData.countryCode,
            this.txData.referrer,
            this.txData.organizationAddress
          );
        }

        console.log(account, "account");
        console.log(tx, "tx");

        let gas = await tx.estimateGas({ from: account });

        console.log(
          {
            from: account,
            to: this.PlanterContract._address,
            value: 0,
            data: tx.encodeABI(),
            gas: gas,
            type: "0x2",
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          },
          "gas"
        );

        const receipt = await this.$web3.eth
          .sendTransaction({
            from: account,
            to: this.PlanterContract._address,
            value: 0,
            data: tx.encodeABI(),
            gas: gas,
            type: "0x2",
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          })
          .on("transactionHash", (transactionHash) => {
            self.$bvToast.toast(["Check progress on Etherscan"], {
              toaster: "b-toaster-bottom-left",
              title: "Processing transaction...",
              variant: "warning",
              href: `${process.env.explorerUrl}/tx/${transactionHash}`,
              bodyClass: "fund-error",
              noAutoHide: true,
            });
          })
          .on("error", (error) => {
            console.log(error, "on errorr");
            if (error.code === 32602) {
              self.$bvToast.toast(["You don't have enough Ether (ETH)"], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            } else if (error.code === -32602) {
              //do nothing
            } else {
              self.$bvToast.toast([error.message.substring(0, 100)], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                href: `${process.env.explorerUrl}/tx/${transactionHash}`,
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            }
          });

        if (receipt && receipt.transactionHash) {
          this.$bvToast.toast(["Planter joined successfuly"], {
            toaster: "b-toaster-bottom-left",
            title: "Transaction is successful",
            variant: "success",
            href: `${process.env.explorerUrl}/tx/${receipt.transactionHash}`,
          });

          this.planterStatus = 1;
        }
      } catch (error) {
        console.log(error, "errorr exception");

        self.$bvToast.toast([error.message.substring(0, 100)], {
          toaster: "b-toaster-bottom-left",
          title: "Error occured!",
          variant: "danger",
          noAutoHide: true,
          bodyClass: "fund-error",
        });
      }

      this.loading.joinPlanter = false;
    },
    async joinByAdmin() {
      if (this.roleGranted && this.planterStatus == 1) {
        this.$bvToast.toast("this planter already is planter", {
          variant: "danger",
          title: "Already planter",
          toaster: "b-toaster-bottom-left",
        });
        return;
      }

      if (!confirm("Are you sure?")) {
        return;
      }

      let safeAddress = process.env.GNOSIS_SAFE_ADDRESS;
      let safeURL = process.env.GNOSIS_SAFE_URL;

      //create gnosis safe instance
      const ethAdapterOwner = new Web3Adapter({
        web3: this.$web3,
        signerAddress: this.$cookies.get("account"),
      });

      const safeSdk = await Safe.create({
        ethAdapter: ethAdapterOwner,
        safeAddress: safeAddress,
      });

      const safeService = new SafeServiceClient(process.env.GNOSIS_SAFE_TX_URL);

      const tx = this.AccessRestrictionContract.methods.grantRole(
        this.txData.roleValue,
        this.txData.publicAddress
      );
      const data = tx.encodeABI();

      let txPlanter;
      if (this.txData.type == 2) {
        txPlanter = this.PlanterContract.methods.joinOrganization(
          this.txData.publicAddress,
          this.txData.longitude,
          this.txData.latitude,
          this.txData.countryCode,
          this.txData.capacity,
          this.txData.referrer
        );
      } else {
        if (
          this.txData.type == 3 &&
          (this.txData.organizationAddress == process.env.zeroAddress ||
            this.txData.organizationAddress == "")
        ) {
          this.$bvToast.toast("Please select organization", {
            variant: "danger",
            title: "Validation error",
            toaster: "b-toaster-bottom-left",
          });
          return;
        }

        if (
          this.txData.type == 1 &&
          this.txData.organizationAddress != process.env.zeroAddress
        ) {
          this.$bvToast.toast("Organization must be zero Address", {
            variant: "danger",
            title: "Validation error",
            toaster: "b-toaster-bottom-left",
          });
          return;
        }

        txPlanter = this.PlanterContract.methods.joinByAdmin(
          this.txData.publicAddress,
          this.txData.type,
          this.txData.longitude,
          this.txData.latitude,
          this.txData.countryCode,
          this.txData.referrer,
          this.txData.organizationAddress
        );
      }
      const dataPlanter = txPlanter.encodeABI();

      let transactions = [
        {
          to: this.AccessRestrictionContract._address,
          value: 0,
          data: data,
        },
        {
          to: this.PlanterContract._address,
          value: 0,
          data: dataPlanter,
        },
      ];

      const nextNonce = await safeService.getNextNonce(safeAddress);
      const options = {
        nonce: nextNonce,
      };

      this.$web3.currentProvider.enable();

      const safeTransaction = await safeSdk.createTransaction(
        transactions,
        options
      );

      const txHash = await safeSdk.getTransactionHash(safeTransaction);

      const signature = await safeSdk.signTransactionHash(txHash);

      try {
        await safeService.proposeTransaction({
          safeAddress: safeAddress,
          senderAddress: this.$cookies.get("account"),
          safeTransaction: safeTransaction,
          safeTxHash: txHash,
          origin: "Safe Core SDK: Safe Service Client",
        });

        this.$bvToast.toast(
          "Submitted a batch of " +
            transactions.length +
            " " +
            this.userDetails.user.firstName +
            " " +
            this.userDetails.user.lastName,
          {
            variant: "success",
            title: "Submit successful",
            toaster: "b-toaster-bottom-left",
            href: safeURL + safeAddress + "/transactions/" + txHash,
            noAutoHide: true,
          }
        );
      } catch (err) {
        console.log(require("util").inspect(err, true, null, true));
      }

      try {
        const signatureRes = await safeService.confirmTransaction(
          txHash,
          signature.data
        );

        this.$bvToast.toast("Transaction successfully confirmed!", {
          variant: "success",
          title: "Confirm Transaction successful",
          toaster: "b-toaster-bottom-left",
          href: safeURL + safeAddress + "/transactions/" + txHash,
        });
      } catch (err) {
        console.log(require("util").inspect(err, true, null, true));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.user-page-details {
  .banner {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-height: 25vh;
    border-radius: 7px;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    border: 2px solid white;
    width: 97.6%;
    position: absolute;
    top: 20px;
    left: 7px;
  }
  .box-banner-details {
    margin-top: 50px;
    height: 20vh;
    padding: 5px 25px;
    .user-img {
      img {
        z-index: +999;
        border-radius: 50%;
        height: 100px;
        filter: blur(0px);
        -webkit-filter: blur(0px);
        border: 2px solid rgb(255, 255, 255);
      }
    }
  }
  .user-detail-main {
    margin-bottom: 100px;
    .edit-button {
      position: absolute;
      right: 25px;
      display: flex;
      flex-direction: column;
      float: right;
      img {
        width: 25px;
        position: absolute;
        right: 0;
      }
      button {
        margin-top: 40px;
        padding: 10px 25px;
      }
      .join-by-admin {
        margin-top: 35px;
      }
      .btn-warning {
        border: 0;
        padding: 5px 15px;
        border-radius: 6px;
        color: white;
      }
    }
    overflow: hidden;
    background: #ffffff;
    box-shadow: 2px 4px 42px rgba(0, 0, 0, 0.1);
    padding: 15px 35px;
    p,
    span {
      word-wrap: break-word;
    }
    span {
      padding-left: 5px;
      color: #424242;
    }
  }
}
</style>
