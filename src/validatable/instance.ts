import Class from '../class.js';
import {ValidatableParameters, ValidatableParameter} from '@axiona/validator/message/function/validatable.js';
import Value from '@axiona/value/value.js';
import Validatable from '@axiona/validatable/validatable.js';
import Message from '@axiona/message/message.js';
import {ReadonlyWrapperType, ReadonlyWrapperParameters} from '@axiona/validator/validatable/readonly-wrapper.js';
import {CallbackParameters} from '@axiona/validator/validatable/callback.js';
import InstanceBoolean from '../value/boolean/instance.js';
import ClassInterface from '../class/class.js';
import Dynamic from '@axiona/validator/value/validatable.js';
import ValidatorValidatable from '@axiona/validator/validatable/validatable.js';


export interface InstanceContext<
    // ValueT,
    InstanceT extends Class<object, unknown[]>,
    // MessageT
> /*extends ReadonlyWrapperType<Value<ValueT>, Message<MessageT>, Validatable>*/ {
    readonly class : InstanceT;
}

export class InstanceParameter<ValueT, InstanceT extends Class<object, unknown[]>, MessageT>
    extends ReadonlyWrapperParameters<Value<ValueT>, Message<MessageT>, Validatable>
    implements ValidatorValidatable<ValueT, MessageT>, InstanceContext</*ValueT, */InstanceT/*, MessageT*/>
{
    readonly class : InstanceT;

    constructor(
            argument : Value<ValueT> &
            Message<ValidatableParameter<ValueT, MessageT, Dynamic<ValueT> & ClassInterface<InstanceT>>> &
            ClassInterface<InstanceT>
    ) {

        const msg = CallbackParameters(argument, InstanceBoolean, ()=>argument.message(this));

        super(argument, msg, msg);

        this.class = argument.class;
    }
}

export class InstanceParameters<ValueT, InstanceT extends Class<object, unknown[]>, MessageT>
    extends InstanceParameter<ValueT, InstanceT, MessageT>
{

    constructor(
        value : ValueT,
        class_ : InstanceT,
        message : ValidatableParameters<ValueT, MessageT, [InstanceT]>,
    ) {

        super({
            value,
            message: (argument)=>message(argument.value, argument.valid, argument.class),
            class:class_
        });
    }
}

namespace Instance {
    export const Parameters = InstanceParameters;
    export const Parameter = InstanceParameter;
    export type Context<
        // ValueT,
        InstanceT extends Class<object, unknown[]>,
        // MessageT
    > = InstanceContext<
        // ValueT,
        InstanceT
        // MessageT
    >;
}
export default Instance;
