import React from 'react';
import { FormContext } from './FormReactBuilder.js'

const INP_ENUM = {
  PROPS: { AUTO_COMPLETE: { OFF: "off", ON: "on" }, },
  FEATURES: {
    AUTO_REMOVE_SPACES(val) {
      return val.trim().split(" ").filter(word => (word !== "")).join(" ");
    },
    AUTO_CAPITALIZE(val) {
      return val.trim().split(" ").filter(word => (word !== ""))
        .map(word => (word.slice(0, 1).toUpperCase() + word.slice(1))).join(" ");
    },
    AUTO_FORMAT_FLOAT_NUMBERS(val) {
      const isNotNum = (n) => !isNaN(Number.parseInt(n));
      let [intPart, ...residual] = val.split(".");

      intPart = Number.parseInt(intPart.split("").filter(isNotNum).join(""));
      residual = "." + (residual.join("").split("").filter(isNotNum).join("") || 0);

      let result = "";
      if (!intPart) result = ("0" + residual);
      else {
        while (intPart > 0) {
          result = "," + intPart % 1000 + result;
          intPart = Number.parseInt(intPart / 1000);
        }
        result = result.slice(1) + residual;
      }

      return result;
    },
  }
};

function buildSupportCompos(rootObj) {
  switch (rootObj.props.type) {
    case "password": {
      const handleOnClickToHide = e => {
        const inpTag = e.target.parentElement.parentElement.querySelector("input");
        if (inpTag.type == 'text') {
          inpTag.type = 'password';
          e.target.classList.add("HIDE");
          e.target.parentElement.querySelector("i.show-pass").classList.remove("HIDE");
        }
      };
      const handleOnClickToShow = e => {
        const inpTag = e.target.parentElement.parentElement.querySelector("input");
        if (inpTag.type == 'password') {
          inpTag.type = 'text';
          e.target.classList.add("HIDE");
          e.target.parentElement.querySelector("i.hide-pass").classList.remove("HIDE");
        }
      };

      rootObj.subCompos.push(
        <div className="password-eyes">
          <i onClick={handleOnClickToHide} className="hide-pass HIDE">-----</i>
          <i onClick={handleOnClickToShow} className="show-pass">OOOOO</i>
        </div>
      );
      break;
    }
    case "search": {

      break;
    }
  }
  return rootObj.subCompos;
}

function insertProp(rootObj, name, value) {
  rootObj.props[name] = value;
  return rootObj;
}

function InputReactBuilder() {
  return {
    props: {}, validators: [], features: [], subCompos: [],
    label(val) { return insertProp(this, 'label', val); },
    name(val) { return insertProp(this, 'name', val); },
    placeholder(val) { return insertProp(this, 'placeholder', val); },
    type(val) { return insertProp(this, 'type', val); },
    value(val) { return insertProp(this, 'value', val); },
    maxLength(val) { return insertProp(this, 'maxLength', val); },
    min(val) { return insertProp(this, 'min', val); },
    max(val) { return insertProp(this, 'max', val); },
    autoComplete(val) { return insertProp(this, 'autoComplete', val); },
    readOnly(val) { return insertProp(this, 'readOnly', val); },
    disabled(val) { return insertProp(this, 'disabled', val); },
    required(val) { return insertProp(this, 'required', val); },
    //--This field is used to build validators in order of validatorObjects in configurations array.
    orderedValidators(configs) { this.validators = configs; return this; },
    moreFeaturesOnBlur(callbacks) { this.features = callbacks; return this; },
    subComponents(compos) { this.subCompos = compos; return this; },
    build() {
      const rootObj = this;
      //--Give TempCompo an uppercase name to serve react-rules.
      const Component = function ({ index }) {
        const [errMsg, setErrMsg] = React.useState("");
        const [inpVal, setInpVal] = React.useState("");
        const { validationRes, setSpecifiedValidationRes } = React.useContext(FormContext);

        React.useEffect(() => {
          //--Set default validated input value is "false" to symbolize for init-empty-value of tag.
          setSpecifiedValidationRes(false, index);
          //--Validate default-inp-value (from rootObj.props.value) by fake event (object "e").
          if (rootObj.props.value) {
            setInpVal(rootObj.props.value);
            callValidators({ target: { value: rootObj.props.value } });
          }
        }, []);

        const callValidators = React.useCallback((e) => {
          setInpVal(e.target.value);  //--Always update Input.value, which is controlled component by React.
          if (rootObj.validators) {
            for (let validatorObj of rootObj.validators) {
              setErrMsg("");
              if (!validatorObj.check(e.target.value)) {
                setSpecifiedValidationRes(false, index);
                setErrMsg(validatorObj.errMsg);
                return;
              } else {
                setSpecifiedValidationRes(true, index);
              }
            }
          }
        }, []);

        const callMoreFeatures = React.useCallback((e) => {
          callValidators({ target: { value: rootObj.features.reduce((a, f) => f(a), e.target.value) } });
        }, []);

        return (
          <div className="form-input" name={rootObj.props.name}>
            <fieldset>
              <legend>{rootObj.props.label}</legend>
              <input {...rootObj.props} onChange={callValidators} onBlur={callMoreFeatures} value={inpVal} />
            </fieldset>
            <div className="form_text-input_err-message">
              <span plainvalue={errMsg}>{errMsg}</span>
            </div>
            {buildSupportCompos(rootObj)}
          </div>
        );
      }
      return React.memo(Component);
    },
  };
};

export { INP_ENUM, InputReactBuilder }