import nodemailer from 'nodemailer';
// import settings from '../../../settings';

// export default nodemailer.createTransport(settings.mailer);
export default nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'no-reply@lenshood.in',
    serviceClient: '111782888407310857023',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDThHnfFdLG1snv\nJZI/vzyxXLFdcgZoMLMUX5HMSGWsD4AVnVv7Bi9RMA5UFvR9QwR72TknA6Yh/BJJ\no1/qNkIxlQS044c3qzbkb73DpGX+cKKuAZfaRazDVGKbJnGi6hW5tmIZLKjwZb70\nO/dS87p1xDonqAGiVf79IaLDlghM+hlCuKmweHm8UGqiFNwcvn2qaWvRpTI31d58\nkRB2rhZrfSwOgiDUIxw97cG52ShhtPdsGJ42ipRM0CI/ZJm7TmTKOQ8Kf+LAsiRw\nxTAMMJLIGJuVavcxSQhUJv3lnwgvT+6AeVeSPGN6HxECPCXjDJBFdsMeYVDvnrad\nTKnQf2HjAgMBAAECggEAArRl+8ogSu3mC6mwisyQb4U2UTUIFMBeqv7bqeqDvrFt\n23RT4V5nC00VXmSFOkBYNDbWRwnv1bCCpAWC6NN7H9M7WSbL9GOvA8s1IzSpB2kO\nBQGMKWFJm4Tz7rG35CGIfH2RbWq+a+cAyPjFVEG3jELGHlwgQct2z6d9JN8pGOqs\n4KAeHmDoW+tzRTgVHveF4IQLb9k0LpnwvUJp0fM8clToxlmS4RgbWc7fzpHI1h+P\nSKxVd8llK2+vUJAeBJNDP9q8F93lBMd1/8X6S1KmYHbKdcRZEa9KLPnosaz8g7WA\nqgWpIdYcO8jiYCFeJUz+vZ52yi1tifjnvOuHjMvMKQKBgQD1EW51QrEQptlxY8ik\n/ZvQ33f9pltRh+UJ3vwNMholdrH3XhKfQN0P7UYujrJk/p383KGhzsDGVsNqyPNt\nZPVF+vYxc7sj2cOq4suUnCuK9VRJhii+C4lSj32f0O+NP9a5cNU6obwdyyNHNzd9\nTFhGBQB3ONGW27VD0GtXoBHNSwKBgQDc8+ldmN2QtB5KMAdZZn5yY/Y86QdvAZVB\nwa084MyrI/Y5ZzXLfJXEKQxEsRk6KO9JkKpQg5IW5/ZGQeBm0HvWs8XUtqp3OnUm\ngFvvzcpH6ugkpiMxvZCfEvoZvmAvrxPKRCodG47VewfIspQDC/c+OwCzJG5keM2S\nKH5Y4+pWyQKBgH1oYy8MZtHPoBw/ZNDRmufjQ2MAu2BYe2N2wWL7TZf4So/8iukF\n51ocILr4eN/nz+8y9F96DvowMiY2GSPU8xLRnySlRZHOASw0jNtKo5mje3N4fObr\nvmUKWs3qvHt6vKX+0I8Fbt+MMUxjPDkZVV7XdmqMH+zkF7lRMW0Q06tLAoGAfBeE\n3itHbMisJlBZIE2fAJHBrq3VnfOOpzKmIAXFDO0SkWS04sbiuhuvpziriW2KDo/w\nB24Nc03tk8HVzQiUNJ4con3AuVuchfYbLFAwpjl5DXQ9Wec0PRMEYcb48G7st3GX\nEWfzzVPeqEobNKbYwhuTJgl08nqiQc76PuQqLXkCgYABayILSw0EDE9ORWIs+QM5\no2xgpncv+Pj3+muZBWw2Znr1n2KuJApVh1WzyR+3XlERHP7UYh0bsXSniQBWu9Xk\nE2VwxpUQwoS3QJlfSH7PgqvrUJCWzO04Ia/KIK894NIWn17jyKYP11TzJgq5hxTy\n2g76P+f6x/0JRKv8+m/YLg==\n-----END PRIVATE KEY-----\n'
  }
});
