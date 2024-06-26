// import moment from "moment";
import * as yup from "yup";

export enum ServicesType {
  TOTEM = "TOTEM",
}

export enum DaysOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}


export const serviceSchema = yup.object({
  company_id: yup.string().required(),
  name: yup.string().required(),
  type: yup.string().test((originalValue, ctx) => {
    if (originalValue === undefined) {
      return true
    } 
    if (!(originalValue in ServicesType)) {
        return ctx.createError({ message: 'Tipo de Servico inválido' })
    }
    return true
  }),
  availability: yup.array().of(
    yup.object({
      day_of_week: yup.string().oneOf(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']).required(),
      time_periods: yup.array().of(
        yup.object({
          start_time: yup.string().required(),
          end_time: yup.string()
            .test('end_time', 'end_time deve ser maior que start_time', function () {
              const start_time = this.parent.start_time;
              return start_time < this.parent.end_time;
            })
        })
      ).test('time_periods', 'Os períodos não podem entrar em conflito com outros', function () {
        const time_periods = this.parent.time_periods;
        for (let i = 0; i < time_periods.length; i++) {
          for (let j = i + 1; j < time_periods.length; j++) {
            const tp1 = time_periods[i];
            const tp2 = time_periods[j];
            if (
              (tp1.start_time <= tp2.end_time && tp1.end_time >= tp2.start_time) ||
              (tp2.start_time <= tp1.end_time && tp2.end_time >= tp1.start_time)
            ) {
              return false; // Conflito encontrado
            }
          }
        }
        return true; // Não há conflito
      }).required(),
    })
  ).required(),
  active: yup.boolean().required()
});

export type CreateServiceType = yup.InferType<typeof serviceSchema>;

export const serviceUpdateSchema = yup.object({
  service_id: yup.string().required(),
  company_id: yup.string().required(),
  name: yup.string().required(),
  type: yup.string().test((originalValue, ctx) => {
    if (originalValue === undefined) {
      return true
    }
    
    if (!(originalValue in ServicesType)) {
        return ctx.createError({ message: 'Tipo de Servico inválido' })
    }
    return true
  }),
  availability: yup.array().of(
    yup.object({
      day_of_week: yup.string().oneOf(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']).required(),
      time_periods: yup.array().of(
        yup.object({
          start_time: yup.string().required(),
          end_time: yup.string().test('end_time', 'end_time deve ser maior que start_time', function () {
            const start_time = this.parent.start_time;
            return start_time < this.parent.end_time;
          }),
        })
      ).required(),
    })
  ).required(),
  active: yup.boolean().required()
});

export type UpdateServiceType = yup.InferType<typeof serviceUpdateSchema>;
