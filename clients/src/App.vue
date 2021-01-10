<template>
  <div>
    <div class="form">
      <form ref="form" @submit.prevent="submitForm" class="inputs">
        <label for="tag">
          <p>Tag <span class="required"> *</span></p>

          <input
            ref="tag"
            :class="{ 'is-invalid': submitted && $v.form.tag.$error }"
            type="text"
            v-model="form.tag"
          />
        </label>

        <label for="pattern">
          <p>
            Pattern <span class="required"> *</span>
            <button @click="addPattern()" type="button" class="add">Add</button>
          </p>
          <input
            ref="pattern"
            :class="{ 'is-invalid': submitted && $v.pattern.$error }"
            type="text"
            v-model="pattern"
          />
        </label>

        <label for="response">
          <p>
            Responses <span class="required"> *</span>
            <button @click="addResponse()" type="button" class="add">
              Add
            </button>
          </p>
          <input
            ref="response"
            :class="{ 'is-invalid': submitted && $v.response.$error }"
            type="text"
            v-model="response"
          />
        </label>

        <label for="context-set">
          <p>Context Set</p>
          <input ref="context-set" type="text" v-model="form.context_set" />
        </label>
        <label for="context-filter">
          <p>Context Filter</p>
          <input
            ref="context-filter"
            type="text"
            v-model="form.context_filter"
          />
        </label>
      </form>
    </div>
    <div class="btns">
      <button class="btn-clear" @click="clearForm()">Clear Input</button>
      <button class="btn-submit" @click="submitForm()" type="submit">
        Submit
      </button>
    </div>
    <div @click="sortAndSave()">
      <button class="btn-sort">Sort & Save</button>
      <circle-spin v-if="isLoading"></circle-spin>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "App",
  mixins: [validationMixin],
  data() {
    return {
      form: {
        tag: "",
        patterns: [],
        responses: [],
        context_set: "",
        context_filter: "",
      },
      submitted: false,
      pattern: [],
      response: [],
      isLoading: false,
    };
  },
  validations: {
    pattern: {
      required,
    },
    response: {
      required,
    },
    form: {
      tag: {
        required,
      },
    },
  },
  methods: {
    clearForm() {
      this.form.tag = "";
      this.pattern = [];
      this.response = [];
      this.form.context_set = "";
      this.form.context_filter = "";
    },
    submitForm() {
      this.submitted = true;
      this.$v.$touch();
      if (
        this.$v.$invalid &&
        this.form.patterns.length == 0 &&
        this.form.responses.length == 0
      ) {
        return;
      } else {
        if (this.pattern !== "" && this.response !== "")
          this.form.patterns.push(this.pattern);
        this.form.responses.push(this.response);
      }

      axios
        .post("//localhost:3030/create_entry", this.form)
        .then((response) => {
          this.submitted = true;
          alert(response.data.message);
          this.clearForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sortAndSave() {
      this.isLoading = true;
      this.submitted = true;
      console.log(this.submitted);
    },
    addPattern() {
      if (this.pattern !== "") {
        this.form.patterns.push(this.pattern);
        this.pattern = "";
      }
    },
    addResponse() {
      if (this.responses !== "") {
        this.form.responses.push(this.response);
        this.response = "";
      }
    },
  },
};
</script>

<style>
.form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.pattern {
  position: relative;
}

.add {
  display: inline;
}

.inputs {
  margin: 0 auto;
}
label p {
  font-size: 18px;
  font-weight: 600;
}

input {
  height: 44px;
  width: 350px;
  max-width: 100%;
  margin-right: 10px;
  outline: none;
  border: 1px solid #d1d3d4;
}
.btns {
  max-width: 350px;
  margin: 0 auto;
  width: 100%;
  padding: 30px;
}
.btn-clear {
  color: #ffffff;
  box-sizing: border-box;
  font-size: 17px;
  height: 58px;
  width: 100px;
  border: 1px solid #b80000;
  background-color: #b80000;
  float: left;
  margin-left: -9px;
  outline: none;
}

.btn-submit {
  color: #ffffff;
  box-sizing: border-box;
  font-size: 17px;
  height: 58px;
  width: 100px;
  border: 1px solid#094a00;
  background-color: #094a00;
  float: right;
  outline: none;
}

.btn-sort {
  color: #ffffff;
  box-sizing: border-box;
  font-size: 17px;
  height: 58px;
  width: 355px;
  margin: 45px -100px;
  border: 1px solid#e30f00;
  background-color: #e30f00;
  text-align: center;
  position: absolute;
  outline: none;
}

input.is-invalid {
  border-color: red;
}

.invalid {
  color: red;
}

.add {
  color: #ffffff;
  box-sizing: border-box;
  font-size: 15px;
  height: 30px;
  width: 50px;
  border: 1px solid #b80000;
  background-color: #b80000;
  float: right;
  margin-right: 12px;
  outline: none;
}
.required {
  color: #f50537;
  size: 15px;
  line-height: 20px;
}
.sk-fading-circle {
  margin: 50px -15px !important;
  float: right;
}
</style>>



