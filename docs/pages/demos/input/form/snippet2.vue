<template>
  <DuCard class="important-mt-4px" title="创建商品" guide-text="">
    <DuForm label-size="80px" layout="vertical">
      <DuFormItem label="商品名称" required>
        <DuInput placeholder="请输入商品名称" :trim="true" />
      </DuFormItem>
      <DuFormItem
        label="价格"
        info="请输入整数"
        required
        tips="金额不能小于5元"
      >
        <DuInput
          placeholder="请输入金额"
          :trim="true"
          prefix="￥"
          suffix="精确到整数"
        />
      </DuFormItem>
      <DuFormItem label="库存" required>
        <DuInput placeholder="数量" :trim="true" />
      </DuFormItem>
      <DuFormItem label="发货模式" required>
        <DuRadioGroup :value="1" inline>
          <DuRadio label="直接物流" :value="1" />
          <DuRadio label="寄存柜" :value="2" />
          <DuRadio label="自提" :value="3" />
        </DuRadioGroup>
      </DuFormItem>
      <DuFormItem label="支付方式" required>
        <DuCheckboxGroup :value="['1']">
          <DuCheckbox label="支付宝" name="1" />
          <DuCheckbox label="微信" name="2" />
        </DuCheckboxGroup>
      </DuFormItem>
      <DuFormItem label="极速模式" required>
        <DuSwitch :on="true" />
      </DuFormItem>
      <DuButton full size="large" ext-class="!mt-8px">发布</DuButton>
    </DuForm>
  </DuCard>
</template>

<script setup lang="ts">
import {
  DuButton,
  DuForm,
  DuFormItem,
  DuInput,
  DuCard,
  DuRadioGroup,
  DuRadio,
  DuCheckboxGroup,
  DuCheckbox,
  DuSwitch,
} from 'dangoui'
</script>
